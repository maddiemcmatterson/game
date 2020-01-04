import * as SQLite from 'expo-sqlite';

var md5 = require('md5');

const profileDB = 'profile.db';
const profileTable = 'user';
const historyTable = 'logs';
const profileSchema = {
  'uid': {
    'columnName': 'uid',
    'dataType': 'TEXT',
    'nullable': false,
    'primary': false,
  },
  'firstName': {
    'columnName': 'firstName',
    'dataType': 'TEXT',
    'nullable': false,
    'primary': true,
  },
  'lastName': {
    'columnName': 'lastName',
    'dataType': 'TEXT',
    'nullable': false,
    'primary': true,
  },
  'imagePath': {
   'columnName': 'imagePath',
   'dataType': 'TEXT',
   'nullable': false,
   'primary': false,
  },
  'passCode': {
   'columnName': 'passCode',
   'dataType': 'TEXT',
   'nullable': true,
   'primary': false,
  },
};

const escapeChar = "\'";

export function getProfiles(callback) {
  return queryProfiles((_, profiles) => {
    profiles = profiles.rows._array;
    callback(profiles);
  });
}

export function getProfile(firstName, lastName, callback) {
  console.log('Getting Existing Profile by Name...');
  let sqlStatement =
    ['SELECT', Object.keys(profileSchema).join(', '),
    'FROM', profileTable,
    'WHERE firstName =', [escapeChar, firstName, escapeChar].join(''),
    'AND lastName =', [escapeChar, lastName, escapeChar].join(''),    ';'].join(' ');
  return executeSql(sqlStatement, [], callback);
}

export function addProfile(info) {
  console.log('Adding Profile to Database: ' + JSON.stringify(info));
  let values = [info.uid, info.firstName, info.lastName, info.imagePath, info.passCode === null ? null : md5(info.passCode)];
  let sqlStatement = [
    'INSERT INTO', profileTable, '(' + Object.keys(profileSchema).join(', ') + ')',
    'VALUES', '(' + Object.keys(profileSchema).map(key => '?').join(', ') + ');'].join(' ');
  return executeSql(sqlStatement, values);
}

export function deleteProfile(firstName, lastName) {
  console.log('Deleting Profile from Database: ' + [firstName, lastName].join(' '));
  let sqlStatement = [
    'DELETE FROM', profileTable, 'WHERE firstName=?', 'AND lastname=?'].join(' ');
  executeSql(sqlStatement, [firstName, lastName]);
}

export function initializeProfileDB(override=false) {
  console.log('Initializing Profile Table...');
  if (override) {
    let sqlStatement = 'DROP TABLE IF EXISTS ' + profileTable + ';';
    executeSql(sqlStatement, []);
  }
  return executeSql(createTableStatement(profileTable, profileSchema), []);
}

export function updateProfile(callback, firstName, lastName, column, value) {
  if (column === 'passCode') {
    value = md5(value);
  }
  console.log('Updating Existing Profiles...');
  let sqlStatement = ['UPDATE', profileTable, 'SET', column, '=', value].join(' ');
  return executeSql(sqlStatement, [], callback);
}

function queryProfiles(callback) {
  console.log('Getting Existing Profiles...');
  let sqlStatement = ['SELECT * FROM', profileTable, 'ORDER BY uid DESC;'].join(' ');
  return executeSql(sqlStatement, [], callback);
}

function executeSql(sqlStatement, parameters=[], callback=null) {
  var db = getSqlite(profileDB);
  console.log('Executing: ' + sqlStatement);
  
  db.transaction( tx => {
    tx.executeSql(
      sqlStatement, parameters,
      callback,
      // err => console.log('ERROR...', err),
    );
  });
}

function getSqlite(dbName) {
  return SQLite.openDatabase(dbName);
}

function log2Console(_, {rows}) {
  console.log(JSON.stringify(rows))
}

function processSchema(tableSchema) {
  var rowDDL = [];
  Object.keys(tableSchema).map(key => {
    var row = tableSchema[key];
    rowDDL.push([row.columnName, row.dataType, row.nullable ? '': 'NOT NULL'].join(' '));
  });
  return rowDDL.join(',\n\t');
}

function getPrimaryKeys(tableSchema) {
  var primaryKeys = [];
  Object.keys(tableSchema).map(key => {
      if (tableSchema[key].primary) {
        primaryKeys.push(key);
      }
    });
  return ['PRIMARY KEY (', primaryKeys.join(', '), ')'].join(' ');
}

function createTableStatement(table, schema) {
  return [
    'CREATE TABLE IF NOT EXISTS ' + table,
    ['(\n\t' + processSchema(schema), getPrimaryKeys(schema) + '\n);'].join(',\n\t')]
    .join('\n');
}
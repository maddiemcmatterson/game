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
		'primary': false,
	},
	'imagePath': {
		'columnName': 'imagePath',
		'dataType': 'TEXT',
		'nullable': true,
		'primary': false,
	},
};

export function getProfiles(callback) {
	return queryProfiles((_, profiles) => {
		profiles = profiles.rows._array;
		callback(profiles);
	});
}

export function addProfile(info) {
	console.log('Adding Profile to Database: ' + JSON.stringify(info));
	let values = [md5(Date.now()), info.firstName, info.lastName, info.image];
	let sqlStatement = [
		'INSERT INTO', profileTable, '(' + Object.keys(profileSchema).join(', ') + ')',
		'VALUES', '(' + Object.keys(profileSchema).map(key => '?').join(', ') + ');'].join(' ');
	return executeSql(sqlStatement, values);

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
	console.log('Updateing Existing Profiles...');
	let sqlStatement = ['UPDATE', profileTable, 'SET', column, '=', value].join(' ');
	return executeSql(sqlStatement, [], callback);
}

function queryProfiles(callback) {
	console.log('Getting Existing Profiles...');
	let sqlStatement = ['SELECT', Object.keys(profileSchema).join(', '), 'FROM', profileTable + ';'].join(' ');
	return executeSql(sqlStatement, [], callback);
}

function executeSql(sqlStatement, parameters=[], callback=null) {
	var db = getSqlite(profileDB);
	console.log('Executing: ' + sqlStatement);
	
	db.transaction( tx => {
		tx.executeSql(
			sqlStatement, parameters,
			callback, err => console.log(err));
	});
}

function getSqlite(dbName) {
	return SQLite.openDatabase(dbName);
}

function log2Console(_, {rows}) {
	console.log(JSON.stringify(rows))
}

function processSchema(key, tableSchema) {
	let rowSchema = tableSchema[key];
	return [rowSchema.columnName, rowSchema.dataType, rowSchema.primary ? 'PRIMARY KEY': '', rowSchema.nullable ? '': 'NOT NULL'].join(' ');
}

function createTableStatement(table, schema) {
	return [
		'CREATE TABLE IF NOT EXISTS',
		table,
		'(' + Object.keys(schema).map(key => processSchema(key, schema)).join(', ') + ');']
		.join(' ');
}
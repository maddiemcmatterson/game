import { initializeProfileDB } from './sqliteDatabase';
import { insertDefaultProfiles } from './loadProfiles';


export function initializeDatabase(override=False, callback) {
  initializeProfileDB(override);
  loadProfiles();
  callback();
};


function loadProfiles() {
	insertDefaultProfiles();
};
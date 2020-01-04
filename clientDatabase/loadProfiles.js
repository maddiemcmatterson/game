import { addProfile, updateProfile, getProfiles } from './sqliteDatabase';
import Constants from '../constants/Constants';

var md5 = require('md5');

export function buildProfile( firstName, lastName, passCode, uid=null, imagePath=null) {
  var profile = {
    'firstName': firstName,
    'lastName': lastName,
    'passCode': passCode,
    'imagePath': imagePath,
  }
  if (uid !== null) {
    profile.uid = uid;
  } else {
    profile.uid = md5(Date.now());
  }
  return profile;
}


export function insertDefaultProfiles() {
    addProfile(
      buildProfile(
        'Create',
        'Profile',
        Constants.profiles.DEFAULT_ADD_PROFILE_PASSCODE,
        '-1',
        Constants.profiles.DEFAULT_ADD_IMAGE_PATH
      )
    );
    addProfile(
      buildProfile(
        'Guest',
        'Profile',
        Constants.profiles.DEFAULT_GUEST_PASSCODE,
        '0',
        Constants.profiles.DEFAULT_GUEST_IMAGE_PATH
      )
    );
}

import Constants from '../../../constants/Constants';

var md5 = require('md5');


export function checkPassCode(profile, code, success, failure) {
  if (profile.firstName === 'Guest' && profile.lastName === 'Profile') {
    success();
  }
  else if (profile.passCode === md5(code)) {
    success();
  }
  else {
    failure();
  }
}

export function hashPassCode(code) {
  return md5(code);
}

export function passCodesMatch(code_1, code_2) {
  return (code_1 === code_2);
}

export function isGuestPassCode(code) {
  return passCodesMatch(
    hashPassCode(code),
    Constants.profiles.DEFAULT_GUEST_PASSCODE);
}

export function isAddProfile(profile) {
  return (profile.imagePath === Constants.profiles.DEFAULT_ADD_IMAGE_PATH);
}

export function isGuestProfile(profile) {
  return (profile.imagePath === Constants.profiles.DEFAULT_GUEST_IMAGE_PATH);
}

export function isDefaultImage(profile) {
  return (profile.imagePath === Constants.profiles.DEFAULT_PROFILE_IMAGE_PATH);
}

export function getImage(profile) {
    var image = null;
    if (isGuestProfile(profile)) {
      image = Constants.profiles.DEFAULT_GUEST_IMAGE;
    } else if (isAddProfile(profile)) {
      image = Constants.profiles.DEFAULT_ADD_IMAGE;
    } else if (isDefaultImage(profile)) {
      image = Constants.profiles.DEFAULT_PROFILE_IMAGE;
    } else {
      return (profile.imagePath);
    }
    return image;
  }

export function isStockImage(profile) {
    if (isGuestProfile(profile)){
      return true;
    } else if (isAddProfile(profile)) {
      return true;
    } else if (isDefaultImage(profile)) {
      return true;
    }
    return false;
  }
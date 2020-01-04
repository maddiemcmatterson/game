
// Profile Images Information...
const DEFAULT_GUEST_IMAGE_PATH = '../assets/images/profiles/guestProfile.jpg';
const DEFAULT_GUEST_IMAGE = require(DEFAULT_GUEST_IMAGE_PATH);
const DEFAULT_ADD_IMAGE_PATH = '../assets/images/profiles/newProfile.jpg';
const DEFAULT_ADD_IMAGE = require(DEFAULT_ADD_IMAGE_PATH);
const DEFAULT_ADD_PROFILE_PASSCODE = '';
const DEFAULT_GUEST_UID = '0';
const DEFAULT_GUEST_PASSCODE = '0000';
const DEFAULT_PROFILE_IMAGE_PATH = '../assets/images/profiles/5b342596071e2e29e9cb60995cf18a25.jpg';
const DEFAULT_PROFILE_IMAGE = require(DEFAULT_PROFILE_IMAGE_PATH);

//Game Images Information...
const LETTERS_IMAGE_PATH = '../assets/images/random-letters.png';
const LETTERS_IMAGE = require(LETTERS_IMAGE_PATH);

const MATCH_LETTERS_IMAGE_PATH = '../assets/images/match-letters.jpg';
const MATCH_LETTERS_IMAGE = require(MATCH_LETTERS_IMAGE_PATH);

const NUMBERS_IMAGE_PATH = '../assets/images/random-numbers.jpg';
const NUMBERS_IMAGE = require(NUMBERS_IMAGE_PATH);

const WORDS_IMAGE_PATH = '../assets/images/random-words.jpg';
const WORDS_IMAGE = require(WORDS_IMAGE_PATH);

const DEFAULT_VIBRATION_DURATION = 1000;
const DEFAULT_PASSCODE_LENGTH = 4;

export default {
	'profiles': {
		'DEFAULT_GUEST_IMAGE_PATH': DEFAULT_GUEST_IMAGE_PATH,
		'DEFAULT_GUEST_IMAGE': DEFAULT_GUEST_IMAGE,
		'DEFAULT_ADD_IMAGE_PATH': DEFAULT_ADD_IMAGE_PATH,
		'DEFAULT_ADD_IMAGE': DEFAULT_ADD_IMAGE,
		'DEFAULT_VIBRATION_DURATION': DEFAULT_VIBRATION_DURATION,
		'DEFAULT_GUEST_UID': DEFAULT_GUEST_UID,
		'DEFAULT_GUEST_PASSCODE': DEFAULT_GUEST_PASSCODE,
		'DEFAULT_PROFILE_IMAGE': DEFAULT_PROFILE_IMAGE,
		'DEFAULT_PROFILE_IMAGE_PATH': DEFAULT_PROFILE_IMAGE_PATH,
		'DEFAULT_ADD_PROFILE_PASSCODE': DEFAULT_ADD_PROFILE_PASSCODE,
	},
	'games': {
		'LETTERS': {
			'NAME': 'LETTERS',
			'IMAGE': LETTERS_IMAGE,
			'GAMES': {
				'MATCH_LETTERS': {
					'NAME': 'MATCH_LETTERS',
					'IMAGE': MATCH_LETTERS_IMAGE,
				},
			}
		},
		'NUMBERS': {
			'NAME': 'NUMBERS',
			'IMAGE': NUMBERS_IMAGE,
		},
		'WORDS': {
			'NAME': 'WORDS',
			'IMAGE': WORDS_IMAGE,
		}
	},
	'passcode': {
		'DEFAULT_PASSCODE_LENGTH': DEFAULT_PASSCODE_LENGTH,
	}
}
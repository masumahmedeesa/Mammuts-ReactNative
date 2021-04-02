// export const DOMAIN = 'http://127.0.0.1:8000/'
export const DOMAIN = "https://api.mammuts.it/"
export const PREFIX = DOMAIN + ''
export const URLS = {
  LOGIN: PREFIX + 'auth/login',
  REGISTER: PREFIX + 'auth/register',
  
  UPDATE_PROFILE: PREFIX + 'auth/profileupdate',
  UPLOAD_PROFILE_PICTURE: PREFIX + 'uploadprofilepicture',
  REMOVE_PROFILE_PICTURE: PREFIX + 'removeprofilepicture/',

  RICORDI: PREFIX + 'ricordo',
  STORIES: PREFIX + 'storiesPerson/',
  STORIES_OTHER: PREFIX + 'storiesPersonOther/',

  MONTH_COLLECTION: PREFIX + 'months/',
  SORT_BY_MONTH: PREFIX + 'storiesPersonByMonth/',

  LEGAMI_PERSONAL: PREFIX + 'legami/',
  ALLUSERS: PREFIX + 'allusers',
  LEGAMI_ADD_REMOVE: PREFIX + "legamiAR",

  UPLOAD_FILE: PREFIX + 'uploadfile',
  REMOVE_FILE: PREFIX + 'removefile/',
  UPLOAD_AUDIO: PREFIX + 'uploadaudio',
  REMOVE_AUDIO: PREFIX + 'removeaudio/',
  REMOVE_FILE_EDIT: PREFIX + 'removeImageForEdit/',

  AUDIOCOMMENT: PREFIX + 'audioComment',
  TEXTCOMMENT: PREFIX + 'textComment',
  CHANGE_PRIVATO: PREFIX + 'changePrivato',
  DELETE_COMMENT: PREFIX + 'deleteComment',
  LOAD_COMMENTS: PREFIX + 'loadComments/',
}

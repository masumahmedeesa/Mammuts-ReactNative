import {Platform} from 'react-native'

export default {
  search: {
    paddingHorizontal: 8,
    backgroundColor: '#323232',
    // flexDirection: 'row',
    borderRadius: 6,
    // marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  searchSS: {
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  containerAuto: {
    backgroundColor: 'white',
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 35,
    zIndex: 1,
    borderWidth: 0,
    paddingHorizontal: 2,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  autocompleteContainer: {
    borderWidth: 0,
  },
  renderSearch: {
    backgroundColor: 'white',
    padding: 10,
    // borderRadius: 6
  },
  newStyle: {
    marginLeft: 12,
    marginBottom: 4,
  },
  textNew: {
    fontSize: 16,
    color: 'silver',
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    paddingVertical: 10,
    // marginTop: 5,
    paddingHorizontal: 5,
  },
  // textInput: {
  //   flex: 1,
  //   marginTop: Platform.OS === 'ios' ? 0 : 2,
  //   paddingLeft: 10,
  //   color: '#fff',
  //   fontSize: 17,
  // },
  textInputMulti: {
    flex: 1,
    color: 'black',
    height: 130,
    fontSize: 16,
    paddingVertical: 12,
    // marginTop: 5,
    paddingHorizontal: 5,
  },
  container: {
    padding: 10,
    marginTop: 25,
  },
  textStyle: {
    color: 'silver',
  },
  textStylish: {
    // color: 'darkslategray',
    color: 'black',
  },
  card: {
    backgroundColor: '#323232',
    borderRadius: 8,
    padding: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  cardW: {
    // backgroundColor: '#323232',
    borderRadius: 8,
    padding: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  cardTwo: {
    // backgroundColor: 'lightslategrey',
    backgroundColor: '#323232',
    borderRadius: 8,
    padding: 8,
  },
  cardToo: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 8,
  },
  cardStylish: {
    backgroundColor: 'rgb(0,184,249)',
    // backgroundColor: 'aquamarine',
    borderRadius: 8,
    padding: 7,
  },

  tabBorder: {
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  tabStyle: {
    backgroundColor: '#000000',
    elevation: 0,
    borderWidth: 0,
    // borderRadius: 6
  },
  textStyle: {
    color: 'silver',
    // fontFamily: 'Roboto_medium',
    // fontSize: 14,
  },
  activeTabStyle: {
    backgroundColor: '#000000',
  },
  activeTextStyle: {
    color: '#fff',
    // fontFamily: 'Roboto-medium',
    fontSize: 15,
    // color: 'rgba(255,255,255,1)'
  },

  tabImage: {
    flex: 1,
  },
  photos: {
    width: '100%',
    // backgroundColor: 'white'
    // borderRadius: 10
  },
  photoThumb: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    // backgroundColor: 'white'
  },
  photo: {
    position: 'absolute',
    width: '100%',
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  photoTrash: {
    width: 30,
    height: 32,
    fontSize: 20,
    color: 'red',
    // backgroundColor: '#FFF',
    // paddingVertical: 3,
    // paddingHorizontal: 5,
    marginRight: 3,
    marginBottom: 4,
  },
  gallery: {
    width: '100%',
    height: 80,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderStyle: 'dashed',
    borderRadius: 5,
  },
  foto: {
    backgroundColor: '#323232',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  slider: {
    height: 10,
    margin: 10,
    marginBottom: 50,
  },
  settingsContainer: {
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  errorMessage: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    color: 'red',
  },
  recordingAnime: {
    backgroundColor: '#424252',
    margin: 10,
    padding: 5,
    flex: 1,
    borderRadius: 10,
  },
  progress: {
    height: 8,
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
    // borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  visualization: {
    justifyContent: 'center',
    backgroundColor: 'rgb(0,184,249)',
    marginLeft: 30,
    marginRight: 30,
    padding: 3,
    borderRadius: 10,
  },
  publiccaView: {
    backgroundColor: '#4c4c4c',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 30,
  },
  publiccaText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: 'rgb(0,184,249)',
    padding: 5,
  },
  publiccaDisabled: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: 'grey',
    padding: 5,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}

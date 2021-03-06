import {Platform} from 'react-native'

export default {
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: Platform.OS == 'ios' ? 8 : 10,
    backgroundColor: '#000000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 21,
  },
  text_footer: {
    color: 'hotpink',
    fontSize: 18,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    // flex: 1,
    marginTop: 10,
    backgroundColor: '#4c4c4c',
    borderRadius: 10,
    // padding: 8,
    paddingLeft: Platform.OS === 'ios' ? 10 : 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    paddingRight: Platform.OS === 'ios' ? 10 : 8,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
    // paddingBottom: 5
  },
  forCalendar: {
    flexDirection: 'row',
    // flex: 1,
    marginTop: 10,
    backgroundColor: '#4c4c4c',
    borderRadius: 10,
    padding: 8,
  },
  actionW: {
    flexDirection: 'row',
    // marginTop: 10,
    borderRadius: 10,
    marginLeft: 6,
    // marginTop: 35,
    // paddingBottom: 5
    // padding: 10,
  },
  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingLeft: Platform.OS === 'ios' ? 11 : 10,
    paddingTop: Platform.OS === 'ios' ? 11 : 3,
    paddingBottom: Platform.OS === 'ios' ? 11 : 3,
    paddingRight: Platform.OS === 'ios' ? 11 : 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 17,
  },
  textInputW: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 15,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 25,
  },
  signIn: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 17,
    // color:'#323232',
    // color:'#fff',
    color: 'azure',
    fontWeight: 'bold',
    // color:'gainsboro'
    // color: 'silver'
  },
}

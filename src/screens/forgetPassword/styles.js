import {Platform} from 'react-native';

export default{
    container: {
      flex: 1, 
      backgroundColor: 'rgb(0,184,249)'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 15
    },
    footer: {
        flex: 1.5,
        backgroundColor: '#000000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        // fontFamily: 'Ubuntu-Regular'
    },
    text_footer: {
        color: 'hotpink',
        fontSize: 18,
        fontWeight: 'bold'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#4c4c4c',
        borderRadius: 10,
        // padding: 15,
        paddingLeft: Platform.OS === 'ios' ? 11 : 10,
        paddingTop: Platform.OS === 'ios' ? 11 : 3,
        paddingBottom: Platform.OS === 'ios' ? 11 : 3,
        paddingRight: Platform.OS === 'ios' ? 11 : 8,
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#f2f2f2',
        // paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 2,
        paddingLeft: 10,
        color: '#fff',
        fontSize: 18,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginTop: 2
    },
    button: {
        alignItems: 'center',
        marginTop: 15
    },
    signIn: {
        width: '100%',
        height: Platform.OS == 'ios' ? 34 : 38,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 20,
        // color:'#323232',
        // color:'#fff',
        color:'azure',
        fontWeight: 'bold',
        // color:'gainsboro'
        // color: 'silver'
    }
  };
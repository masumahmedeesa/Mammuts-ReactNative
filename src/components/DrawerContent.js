import React from 'react'
import {View, StyleSheet, Image, Dimensions, Platform} from 'react-native'
import {Caption, Drawer, Text} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {DrawerContentScrollView} from '@react-navigation/drawer'
// import {AuthContext} from './Context';
import {TouchableOpacity} from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import {logoutAction} from '../store/actions/authActions'

export const DrawerContent = connect(mapStateToProps, {logoutAction})(
  (props) => {
    const user = JSON.parse(props.auth.user)
    // console.log('Drawer', typeof(user), user.nome)
    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height

    let imageSource = null
    imageSource = require('../../assets/images/logo2.jpg')
    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{marginTop: 38, flex: 1}}>
                {imageSource ? (
                  <Image
                    source={imageSource}
                    style={{
                      width:
                        Platform.OS == 'ios'
                          ? windowWidth * 0.6
                          : windowWidth * 0.53,
                      height: windowHeight * 0.2,
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <Icon name="aperture" size={40} color="hotpink" />
                )}
                <Text style={styles.textStyle}> {user.nome}</Text>
                <Caption style={styles.captionStyle}> @{user.cognome} </Caption>
              </View>
            </View>

            <Drawer.Section style={styles.drawerSection}>
              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  props.navigation.navigate('Home')
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon
                    name="home"
                    style={{
                      marginLeft: 11,
                      color: 'rgb(0,184,249)',
                      fontSize: 24,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      padding: 3,
                      marginLeft: 8,
                      fontSize: 17,
                    }}>
                    Casa
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  props.navigation.navigate('Profile')
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon
                    name="user"
                    style={{
                      marginLeft: 9,
                      color: 'rgb(0,184,249)',
                      fontSize: 24,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      padding: 3,
                      marginLeft: 9,
                      fontSize: 17,
                    }}>
                    Il Tuo Profilo
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  props.navigation.navigate('Setting')
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon
                    name="heart"
                    style={{
                      marginLeft: 9,
                      color: 'rgb(0,184,249)',
                      fontSize: 24,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      padding: 3,
                      marginLeft: 9,
                      fontSize: 17,
                    }}>
                    Dedicato A Maddalena
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  props.navigation.navigate('Terms')
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon
                    name="info"
                    style={{
                      marginLeft: 9,
                      color: 'rgb(0,184,249)',
                      fontSize: 25,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      padding: 3,
                      marginLeft: 9,
                      fontSize: 17,
                    }}>
                    Termini E Condizioni
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  props.navigation.navigate('Privacy')
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon
                    name="hash"
                    style={{
                      marginLeft: 9,
                      color: 'rgb(0,184,249)',
                      fontSize: 25,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      padding: 3,
                      marginLeft: 9,
                      fontSize: 17,
                    }}>
                    Privacy Policy
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  props.navigation.navigate('CopyRight')
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <AntDesign
                    name="copyright"
                    style={{
                      marginLeft: 9,
                      color: 'rgb(0,184,249)',
                      fontSize: 22,
                    }}
                  />
                  {/* <Icon
                  name="hash"
                  style={{marginLeft: 9, color: 'hotpink', fontSize: 25}}
                /> */}
                  <Text
                    style={{
                      color: '#fff',
                      padding: 3,
                      marginLeft: 9,
                      fontSize: 17,
                    }}>
                    Copyright
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{padding: 8}}
                onPress={() => {
                  // props.navigation.reset()
                  // console.log(props.navigation.reset)
                  props.logoutAction()
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon
                    name="log-out"
                    style={{
                      marginLeft: 10,
                      color: 'rgb(0,184,249)',
                      fontSize: 25,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      padding: 3,
                      marginLeft: 9,
                      fontSize: 17,
                    }}>
                    Esci
                  </Text>
                </View>
              </TouchableOpacity>
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      </View>
    )
  },
)

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  textStyle: {
    color: 'hotpink',
    marginTop: 10,
    fontWeight: '400',
    fontSize: 19,
  },
  captionStyle: {
    color: '#fee',
    marginTop: 3,
    fontWeight: '400',
    fontSize: 15,
  },
  userInfoSection: {
    paddingLeft: 25,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 20,
    marginLeft: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    marginLeft: 10,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

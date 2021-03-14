import React from 'react'
import {Text, View, StatusBar, TouchableOpacity, ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable'

// import ToolkitPlayer from '../expo/ToolkitPlayer'
import {ricodioActions, legamiCollection} from '../../store/actions/postActions'
import {showLoading, hideLoading} from '../../store/actions/supportActions'
import styles from './styles'

class HomeScreen extends React.Component {
  componentDidMount() {
    const user = JSON.parse(this.props.auth.user)
    this.props.showLoading()
    if (user) {
      this.props.legamiCollection(user.id)
      this.props.ricodioActions(user.id, 1, user)
    }
    this.props.hideLoading()
  }

  render() {
    const user = JSON.parse(this.props.auth.user)
    const {navigation} = this.props
    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.navigate('Search')}>
          <View style={styles.searchBtn}>
            <Icon
              name="search"
              type="FontAwesome"
              style={styles.searchBtnIcon}
            />
          </View>
          <Text style={[styles.textInput, {color: 'grey'}]}>
            Cerca un legame
          </Text>
        </TouchableOpacity>

        <ScrollView style={styles.container}>
          <Animatable.View
            animation="flash"
            duration={3000}
            style={styles.cardStylish}>
            <Text
              style={[styles.textStylish, {fontSize: 20, textAlign: 'center'}]}>
              Ciao {user.nome} {user.cognome}, Benvenuto In Mammuts
            </Text>
          </Animatable.View>
          <View style={[styles.card, {marginTop: 10}]}>
            <Text
              style={[
                styles.textStyle,
                {fontSize: 17, padding: 2, fontWeight: '500'},
              ]}>
              Ogni uomo desidera lasciare un segno del proprio passaggio. I
              primitivi disegnavano, all'interno delle caverne, scene di caccia
              al Mammut, l'uomo di oggi, descrive la propria vita con foto e
              audio Trova un tuo legame Cerca
            </Text>
          </View>

          <View
            style={[
              styles.cardTwo,
              {marginTop: 15, flex: 1, alignItems: 'center'},
            ]}>
            <Icon
              name="clipboard"
              color="aquamarine"
              style={{
                flex: 1,
                fontSize: 30,
                fontWeight: '500',
                paddingTop: 4,
                paddingBottom: 8,
              }}
            />
            <Text style={{fontSize: 20, fontWeight: '500', paddingBottom: 4}}>
              LASCIA
            </Text>
            <Text
              style={{
                fontSize: 17,
                textAlign: 'center',
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 4,
              }}>
              Scrivi la tua biografia, racconta il tuo viaggio, le tue giornate,
              la tua vita mentre la vivi. Lascia un segno del tuo passaggio
            </Text>
          </View>

          <View
            style={[
              styles.cardTwo,
              {marginTop: 15, flex: 1, alignItems: 'center'},
            ]}>
            <Icon
              name="aperture"
              color="aquamarine"
              style={{
                flex: 1,
                fontSize: 30,
                fontWeight: '500',
                paddingTop: 4,
                paddingBottom: 8,
              }}
            />
            <Text style={{fontSize: 20, fontWeight: '500', paddingBottom: 4}}>
              UN
            </Text>
            <Text
              style={{
                fontSize: 17,
                textAlign: 'center',
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 4,
              }}>
              Pubblica le foto di dove ti trovi e racconta la tua esperienza
              tramite una registrazione vocale. Lascia un commento vocale sulle
              foto delle persone con cui hai un legame
            </Text>
          </View>

          <View
            style={[
              styles.cardTwo,
              {marginTop: 15, flex: 1, alignItems: 'center'},
            ]}>
            <Icon
              name="archive"
              color="aquamarine"
              style={{
                flex: 1,
                fontSize: 30,
                fontWeight: '500',
                paddingTop: 4,
                paddingBottom: 8,
              }}
            />
            <Text style={{fontSize: 20, fontWeight: '500', paddingBottom: 4}}>
              SEGNO
            </Text>
            <Text
              style={{
                fontSize: 17,
                textAlign: 'center',
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 4,
              }}>
              Pubblica vecchie foto di famiglia e racconta di quei momenti, di
              cosa ti hanno lasciato. Racconta delle serate passate con gli
              amici. Pubblica le foto dei tuoi amici a quattro zampe e commenta
              tutto con un audio
            </Text>
          </View>

          {/* <TouchableOpacity
            style={{
              marginTop: 30,
            }}
            onPress={() => {
              Alert.alert('Mammuts', 'Will go to a relevant page :)', [
                {text: 'Okay'},
              ])
            }}>
            <View
              style={{
                backgroundColor: 'rgb(0,184,249)',
                borderRadius: 8,
                padding: 6,
              }}
              animation="shake">
              <Text
                style={[
                  styles.textStylish,
                  {fontSize: 20, textAlign: 'center'},
                ]}>
                Aggiungi dei legami o crea dei ricordi
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* <View style={{marginTop: 25, marginBottom: 40}}>
            <View style={[styles.card, {}]}>
              <Text
                style={[styles.textStyle, {fontSize: 17, fontWeight: '600'}]}>
                I TUOI LEGAMI
              </Text>
            </View>
            <View style={[styles.cardTwo, {marginTop: 5}]}>
              <Text style={[styles.textStylish, {fontSize: 16}]}>
                Non hai legami approvati
              </Text>
            </View>
            <View style={[styles.cardTwo, {marginTop: 5}]}>
              <Text style={[styles.textStylish, {fontSize: 16}]}>
                If ties have, it will show in here
              </Text>
            </View>
            <View style={[styles.cardTwo, {marginTop: 5}]}>
              <Text style={[styles.textStylish, {fontSize: 16}]}>
                If ties have, more
              </Text>
            </View>
          </View> */}
        </ScrollView>
      </View>
    )
  }
}

const HomeScreenFunction = (props) => {
  const navigation = useNavigation()

  return <HomeScreen {...props} navigation={navigation} />
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}
export default connect(mapStateToProps, {
  ricodioActions,
  showLoading,
  hideLoading,
  legamiCollection,
})(HomeScreenFunction)

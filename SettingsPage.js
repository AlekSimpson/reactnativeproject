import * as React from 'react';
import { Auth } from 'aws-amplify';
import { useEffect, useState, useReducer } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Ionicons as Icon} from '@expo/vector-icons';
import { MaterialIcons as MI } from '@expo/vector-icons';
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons';
import { Divider } from './Divider.js';
import NetInfo from "@react-native-community/netinfo";
import { SettingsPageStyles as styles } from './Styles.js'
import { Platform } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const width = (windowWidth >= 700 ? (windowWidth / 3) : windowWidth)

var rectangleHeight = width / 7
var centerInRect = rectangleHeight / 3.5

const isWeb = (Platform.OS == 'web' ? true : false)

function Row(props)
{
  return(
    <View style={ styles.rowStyle }>
      {props.icon}
      <Text style={{ color: 'white', marginLeft: 10, marginTop: centerInRect + 2.5, marginBottom: centerInRect }}>{props.text}</Text>
      {props.right}
    </View>
  )
}

function SignOutButton()
{
  const navigation = useNavigation();

  async function signOut()
  {
    if (isWeb)
    {
      navigation.dispatch(CommonActions.goBack());
    }

    try 
    {
      await Auth.signOut()
      console.log('signed out successfully')
    }catch (error)
    {
      console.log('sign out failed successfully ', error)
    }
  }

  return(
    <View style={{ position: 'absolute', right: 0, marginRight: 10 }}>
      <Button title='Sign Out' color='red' onPress={() => signOut()} style={{ marginTop: centerInRect, marginBottom: centerInRect }} />
    </View>
  )
}

function SettingsPage()
{
  const [name, setName] = useState([])
  const [isConnected, setConnected] = useState(true)
  const [isReachable, setReachable] = useState(true)

  useEffect(() => 
  {
    const unsubscribeIfNotWeb = () => 
    {
      if (Platform.OS !== "web")
      {
        const unsubscribe = NetInfo.addEventListener(state => 
        {
          setConnected(String(state.isConnected))
          setReachable(String(state.isInternetReachable))
        })
      }
    }
    
    
    var getUser = getUsername().then(test => setName(test))

    return () => 
    {
      unsubscribeIfNotWeb()
    }
  }, [])

  async function getUsername()
  {
    var userInfo = await Auth.currentUserInfo()
    var userName = userInfo.attributes['name']
    return userName
  }
  
  const topSpace = {
    marginTop: 10
  }

  return(
    <View style = { styles.background }>
        <Text style={ styles.textStyle }>Account Settings</Text>
        <Row icon={<Icon name='md-person' size={20} color='#7CFC00' style={ styles.iconStyle } />} text= {name} right={<SignOutButton/>}/>

        <Text style={ styles.textStyle }>Appearance</Text>
        <Row icon={<Icon name="ios-color-palette" size={20} color="#7CFC00" style={ styles.iconStyle } />} text='Color Theme' />

        <Text style={ styles.textStyle }>Connectivity</Text>
        <View style={ styles.bigRowStyle }>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MI name="network-check" size={20} color="#7CFC00" style={ styles.iconStyle } />
            <Text style={{ color: 'white', marginLeft: 10, marginTop: centerInRect + 2.5, marginBottom: centerInRect }}>Is Connected: </Text>
            <Text style={{ position: 'absolute', right: 0, color: 'white', marginRight: 10, marginTop: centerInRect, marginBottom: centerInRect }}>{isConnected}</Text>
          </View>

          <Divider width={width - 20}/>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <MCI name="transit-connection" size={20} color="#7CFC00" style={ styles.iconStyle } />
            <Text style={{ color: 'white', marginLeft: 10, marginTop: centerInRect + 2.5, marginBottom: centerInRect }}>Internet is reachable: </Text>
            <Text style={{ position: 'absolute', right: 0, color: 'white', marginRight: 10, marginTop: centerInRect, marginBottom: centerInRect }}>{isReachable}</Text>
          </View>
        </View>

        <Text style={{ fontSize: 10, color: 'gray', marginTop: 10 }}>Version Name: React... Native...?</Text>
        <Text style={{ fontSize: 10, color: 'gray' }}>Verison Number: 12.9</Text>
    </View>
  )
}



export { SettingsPage };
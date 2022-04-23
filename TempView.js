import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Divider } from './Divider.js'
import { TempViewStyles as styles } from './Styles.js'

const windowWidth = Dimensions.get('window').width
const width = (windowWidth >= 700 ? (windowWidth / 3) : windowWidth)

function TemperatureIndicator(props)
{
  return(
    <View>
      {props.image}
      {props.text}
    </View>
  )
}

function TemperatureView(args)
{
  return(
    <View style={{ paddingBottom: '2%', paddingTop: '6%' }}>
      <Divider width={width / 1.16}/>
        <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white', textAlign: 'center', marginTop: 5, marginBottom: 5 }}>Temperature</Text>
        <TemperatureIndicator text={<Text style={ styles.tempViewLeftText }>{args.headTemp} °C</Text>} image={<Image source={require('./LocalAssets/extruder.png')} style={styles.tempViewLeftImage}/>}/>
        <TemperatureIndicator text={<Text style={ styles.tempViewRightText }>{args.bedTemp} °C</Text>} image={<Image source={require('./LocalAssets/heatbed.png')} style={styles.tempViewRightImage}/>}/>
      <Divider width={width / 1.16}/>
    </View>
  )
}

export {TemperatureView};
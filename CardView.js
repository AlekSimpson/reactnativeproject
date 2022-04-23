import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { CompletionView } from './CompletionView.js';
import { Entypo } from '@expo/vector-icons';
import { lighter } from './Colors.js';
import { useSelector, useDispatch } from 'react-redux';
import { CardViewStyles as styles } from './Styles.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const width = (windowWidth >= 700 ? (windowWidth / 3) : windowWidth)

const CircleSize = windowWidth / (windowWidth/(windowHeight/6))

const imageHeight = windowHeight / 4

let StatusCodes = {0: 'Offline', 1: 'Asleep', 2: 'Printing', 3: 'Paused'}

function CardView({ printer })
{
  const images = useSelector(state => { return state.imageDict })
  var percentFinished = 0;

  //This is done to convert the number to a Int since it comes through as a float
  if (printer.printerState != null)
  {
    if (printer.printerState.progress != null)
    {
      percentFinished = Math.round(printer.printerState.progress * 100)
    }
  }
  
  return(
    <ImageBackground
      imageStyle={{borderRadius:10}}
      source= {{ uri: images[printer.id] }} // { src }
      defaultSource = { require("./LocalAssets/default4.png") }
      loadingIndicatorSource={require('./LocalAssets/default4.png')}
      style={styles.image}>
      <View 
        style=
        {{
          width: width - 30,
          height: 37,
          backgroundColor: "rgb(25, 40, 65)",
          opacity: .8,
          position: 'absolute',
          bottom: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text style={styles.printerNameText}>
          {printer.name}
        </Text>
        <Text style={styles.printerStatusText}>
          Status: {StatusCodes[printer.status]}
        </Text>
        <Entypo name='chevron-right' color='#7CFC00' size={25} style={{ marginTop: 5, position: 'absolute', right: 0 }}/>
      </View>
      <CompletionView text={''} viewType='card' fontSize={CircleSize/3.5} textPos = {(imageHeight/5)} printer={printer} isCardView={true} percent={percentFinished} />
    </ImageBackground>
  )
}

export { CardView };
import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { TemperatureView } from './TempView.js';
import { CompletionView } from './CompletionView.js';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingCard } from './LoadingCardView.js';
import { useEffect, useState } from 'react'
import { updatePrinter } from './updatePrinters.js';
import { DetailScreenStyles as styles } from './Styles.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const width = (windowWidth >= 700 ? (windowWidth / 3) : windowWidth)

function DetailsScreen({route})
{
  const [showImage, setImage] = useState(false)
  const { printer } = route.params;
  const images = useSelector(state => { return state.imageDict })
  var headTemp = (printer.printerState != null ? printer.printerState.temps.head.currentTemp : '--')
  var bedTemp = (printer.printerState != null ? printer.printerState.temps.bed.currentTemp : '--')

  var percentFinished = 0;

  if (printer.printerState != null)
  {
    if (printer.printerState.progress != null)
    {
      percentFinished = Math.round(printer.printerState.progress * 100)
    }
  }

  const loadingStyle = {
    marginBottom: 25,
    position: 'absolute',
    bottom: 0
  }

  function handleChange()
  {
    setImage(true)
  }
  
  useEffect(() => 
  {
    setTimeout(handleChange, 500)
  }, [])

  return (
    <View style={ styles.background }>
      <CompletionView text={'Completed'} viewType='detail' fontSize={width / 6} textPos={windowHeight / 8.5} printer={printer} isCardView={false} percent={percentFinished} />
      <TemperatureView headTemp={headTemp} bedTemp={bedTemp}/>
      {(!showImage)&&
        <LoadingCard showAnimation={false}  showBanner={false} extraStyle={loadingStyle}/>
      }
      {(showImage)&&
        <Image
          source= {{ uri: images[printer.id] }}
          defaultSource = { require("./LocalAssets/default4.png") }
          loadingIndicatorSource={require('./LocalAssets/default4.png')}
          style={ styles.image }
        />
      }
    </View>
  );
}
export {DetailsScreen};
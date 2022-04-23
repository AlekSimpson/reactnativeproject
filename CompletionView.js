import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { OverlayView } from './OverlayView.js';
import { getColor } from './Colors.js';
import { CompletionViewStyles as styles } from './Styles.js'

/**
* Override styles that get passed from props
**/
const propStyle = (percent, base_degrees) => 
{
  const rotateBy = base_degrees + (percent * 3.6);
  return {
    transform:[{rotateZ: `${rotateBy}deg`}]
  };
}

const renderThirdLayer = (percent, viewType) => 
{
  if (percent > 50)
  {
    /**
    * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
    * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
    * before passing to the propStyle function
    **/
    return <View style={[(viewType == 'detail' ? styles.detailSecondProgressLayer : styles.cardSecondProgressLayer), propStyle((percent - 50), 45) ]}/>
  }else
  {
    return <View style={(viewType == 'detail' ? styles.detailOffsetLayer : styles.cardOffsetLayer)}/>
  }
}

function CompletionView({ text, viewType, fontSize, textPos, printer, isCardView, percent })
{
  let firstProgressLayerStyle;
  // var color;

  //Gets the color for the progress bar to be (these conditions have to be seperate because they are checking values inside of other values)
  if (printer.printerState != null)
  {
    if (printer.printerState.failure != null)
    {
      if (printer.printerState.failure.currentPred != null)
      {
        color = getColor(printer.printerState.failure.currentPred)
      }
    }
  }
  
  //this calculates how many degrees the green arc should be rotated, that is what propStyle() returns
  if (percent > 50)
  {
    firstProgressLayerStyle = propStyle(50, -135);
  }else 
  {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return(
    <View style= { (viewType == 'detail' ? styles.detailViewStyle : styles.cardViewStyle )}>
      <View style={[(viewType == 'detail' ? styles.detailFirstProgressLayer : styles.cardFirstProgressLayer), firstProgressLayerStyle]}/>
      {renderThirdLayer(percent, viewType)}
      <OverlayView compeletedText={text} fontSize={fontSize} textPos={textPos} printer={printer} isCardView={isCardView} />
    </View>
  )
}

export {CompletionView}; 
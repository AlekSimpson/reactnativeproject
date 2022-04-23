import * as React from 'react';
import { useEffect, useState, useReducer } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { PauseOrCancelView } from './PauseOrCancelView';
import { Feather } from '@expo/vector-icons';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Easing } from 'react-native-reanimated';
import { OverlayViewStyles as styles } from './Styles.js'

const AnimatedEntypo = Animated.createAnimatedComponent(Entypo);

const windowHeight = Dimensions.get('window').height;

/*
|***STATUS CODES KEYS***|

0: Offline,
1: Asleep,
2: Printing,
3: Paused
*/

function OverlayView(props)
{
  /* VARIABLES */
  var printerProgress = (props.printer.printerState != null ? (props.printer.printerState.progress != null ? props.printer.printerState.progress : 0) : 0)
  const [showPauseOrCancelView, setShowPause] = useState(0)

  const [spinAnimation, setSpinAnimation] = useState(new Animated.Value(0))

  const [slideAnimation, setSlideAnimation] = useState(new Animated.Value(0))

  //This translates the slide into a string to make it easier to toggle
  const [currentSlideStr, setCurrentSlideStr] = useState('slideUp')

  //This translates the spin into a string so that toggling between them is easier
  const [currentStrSpin, setStrSpin] = useState('spinDown')

  //Spins up
  const spinUp = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })
  
  //Spins down
  const spinDown = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg']
  })

  //Slides down
  const slideDown = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0]
  })
  
  //Slides up
  const slideUp = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200]
  })

  //The current spin the arrow has (better word is direction but I used spin for whatever reason)
  const [currentSpin, setSpin] = useState(spinDown)

  //The current slide that the view will have
  const [currentSlide, setSlide] = useState(slideUp)

  //toggles spin animation action
  const toggleSpin = { 'spinUp' : spinDown, 'spinDown' : spinUp }

  //toggles string spin
  const toggleStrSpin = { 'spinUp' : 'spinDown', 'spinDown' : 'spinUp' }

  //toggles slide animation action
  const toggleSlide = { 'slideUp' : slideDown, 'slideDown' : slideUp }

  //toggles string slide 
  const toggleStrSlide = { 'slideUp' : 'slideDown', 'slideDown' : 'slideUp' }

  // const marginStyle = {
  //   marginTop: (!props.isCardView ? windowHeight/8.9 : ((windowHeight/4)/4)) - 10, 
  // }

  // const moonStyle = {
  //   marginTop: (!props.isCardView ? windowHeight/8.9 : ((windowHeight/4)/4)) - 20, 
  // }

  let icon = {
    0: <Feather name='wifi-off' size={props.fontSize + 10} color='white' style={styles.iconStyle}/>,
    1: <Icon name='ios-moon' size={props.fontSize + 20} color='white' style={styles.iconStyle}/>,
    3: <Icon name='ios-pause' size={props.fontSize + 10} color='white' style={styles.iconStyle}/>
  }
  
  //0 - show icon display (first one that appears)
  //1 - show pause or cancel view
  //2 - confirm cancellation
  
  var AsleepOrOffline = ((props.printer.status == 1 || props.printer.status == 0) ? true : false)
  var isDisplayingIcon = ((props.printer.status == 1 || props.printer.status == 0 || props.printer.status == 3) ? true : false)

  /* FUNCTIONS */

  function handleSlideAnimation()
  {
    /* VERSION 0.5 PRINTER CONTROL ANIMATIONS, NEEDS UPDATING */

    
    let toggleSlideDirection = toggleSlide[currentSlideStr]
    let toggleStrSlideDirection = toggleStrSlide[currentSlideStr]

    setSlide(toggleSlideDirection)
    setCurrentSlideStr(toggleStrSlideDirection)

    Animated.spring(slideAnimation, 
      {
        toValue: 1,
        easing: Easing.linear,
        useNativeDriver: false,
      }
    ).start(() => { setSlideAnimation(new Animated.Value(0)) })
  }

  //Handles the stuff for doing the spin animation
  function handleSpinAnimation()
  {
    //Gets the new spin
    let newSpin = toggleSpin[currentStrSpin]
    let newStrSpin = toggleStrSpin[currentStrSpin]

    //Makes the new spin the current spin
    setSpin(newSpin)
    setStrSpin(newStrSpin)
    
    //Animatation instructions
    Animated.timing(spinAnimation, 
      {
        toValue: 1, 
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: false
      }
    ).start(() => { setSpinAnimation(new Animated.Value(0)) })
  }
  
  //Toggles between the printer controls view and the normal view
  function toggleShowPause()
  {
    handleSlideAnimation()
    handleSpinAnimation()
    if (showPauseOrCancelView == 1)
    {
      setShowPause(0)
    }else if (showPauseOrCancelView == 0)
    {
      setShowPause(1)
    }
  }

  /* STARTUP */

  useEffect(() => 
  {
    //This is one of those lines that is required but I don't know why it is required
    setSpin(spinUp)
  }, [])

  /* WHATS RENDERED */

  return(
    <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
      {(showPauseOrCancelView == 0) &&
        <>
          {(props.printer.status == 2) &&
            <View style={{ flexDirection: 'column' }}>
              <Text 
                style=
                {{
                  fontWeight: 'bold',
                  fontSize: props.fontSize,
                  color: 'white',
                  marginTop: Math.round(windowHeight * 0.0308)
                }}>
                {printerProgress}%
              </Text>
              <Text style= { styles.printingViewText }>{props.compeletedText}</Text>
            </View>
          }
          {(isDisplayingIcon) &&
            icon[props.printer.status]
          }
        </>
      }
      {(showPauseOrCancelView == 1) &&
        <Animated.View style={[styles.pauseOrCancelView, { transform: [{ translateY: currentSlide }] }]}>
          <PauseOrCancelView printer={props.printer} toggleShowPause={toggleShowPause}/>
        </Animated.View>
      }
      {(!props.isCardView && !AsleepOrOffline) &&
        <TouchableOpacity onPress={() => toggleShowPause()}>
          <AnimatedEntypo name='chevron-down' size={32} color='#7CFC00' style={{ marginTop: 20, transform: [{ rotate: currentSpin }] }}/>
        </TouchableOpacity>
      }
    </View>
  )
}

export { OverlayView };
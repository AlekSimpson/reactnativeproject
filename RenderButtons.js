import Amplify, { Storage } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
import 'react-native-gesture-handler';
import * as React from 'react';
import { useEffect } from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardView } from './CardView.js';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { updatePrinter } from './updatePrinters.js';
import { Platform } from 'react-native'
import { RenderButtonStyles as styles } from './Styles.js'

function RenderButtons({ navigation })
{
  const listPrinters = useSelector(state => { return state.listP })
  
  const dispatch = useDispatch()

  var isWeb = (Platform.OS == 'web' ? true : false)

  //Calculates if the printer has expired
  function calculateTimeExpired(printer)
  {
    let currentTime = new Date()
    let printerUpdated = new Date(printer.updatedAt)
    let diff = Math.abs(currentTime - printerUpdated) / 1000;
    let expiredTime = diff > (5 * 60)
    return expiredTime
  }

  //Detects if the printer has been disconnected
  function offlineDetection()
  {
    let i = 0
    listPrinters.forEach(function (printer) 
    {
      if (printer.printerState != null && printer.status != 0)
      {
        let timeExpired = calculateTimeExpired(printer)
        if (timeExpired)
        {
          var newListPrinters = [...listPrinters]
          
          newListPrinters[i].status = 0
          dispatch(updatePrinter(newListPrinters)) /* SHOULD PROBABLY RUN A MUTATION TO FIX THIS ON THE API AS WELL */
        }
      }
      i++
    })
  }
  
  //Stuff for push notifications
  
  if (!isWeb)
  {
    registerForPushNotificationsAsync = async () => 
    {
      if (Constants.isDevice) 
      {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') 
        {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') 
        {
          alert('Failed to get push token for push notification!');
          return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        this.setState({ expoPushToken: token });
      } else 
      {
        alert('Must use physical device for Push Notifications');
      }
  
      if (Platform.OS === 'android') 
      {
        Notifications.createChannelAndroidAsync('default', 
        {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
        });
      }
    };
  }

  useEffect(() => 
  {
    setInterval(offlineDetection, 1000)
  }, [])
  
  //handles touchable opacity press
  const handlePress = (printer) => 
  {
    //here to optimize for performance
    requestAnimationFrame(() => 
    { 
      navigation.navigate('Detail Screen', { printer: printer }) 
    });
  }

  return listPrinters.map((printer) => 
  {
    return (
      <TouchableOpacity key={printer.id} style={styles.touchable} onPress={ () => handlePress(printer) } > 
        <CardView printer={printer}/>
      </TouchableOpacity>
    );
  });
}

export { RenderButtons }
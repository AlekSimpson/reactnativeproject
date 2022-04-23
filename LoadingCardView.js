import * as React from 'react';
import { View } from 'react-native';
import { LoadingCardViewStyles as styles } from './Styles.js'
import { Platform } from 'react-native'

function LoadingCardsView()
{
  return(
    <View>
      {(Platform.OS == 'web') &&
        <LoadingSortWebView/>
      }
      {(Platform.OS !== 'web') &&
        <LoadingSortMobileView/>
      }
      <LoadingCard showBanner={true}/>
      <LoadingCard showBanner={true}/>
      <LoadingCard showBanner={true}/>
    </View>
  )
}

function LoadingCard({showBanner, extraStyle={}})
{
  return(
    <View style={[ styles.background, extraStyle ]}>
        {(showBanner)&&
          <View style={ styles.bottomBanner } />
        }
    </View>
  )
}

function LoadingSortMobileView()
{
  return(
    <View style={{ flexDirection: 'row' }} > 
      <View style={ styles.loadingSortIconMobile } />
      <View style={ styles.loadingSortMobile } />
    </View>
  )
}

function LoadingSortWebView()
{
  return(
    <View style={ styles.loadingSortWeb }>
      <View style={ styles.loadingSortIconWeb } />
      <View style={ styles.loadingSortIconWeb } />
    </View>
  )
}

export { LoadingCardsView, LoadingCard, LoadingSortMobileView, LoadingSortWebView };
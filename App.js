import Amplify, { Storage } from 'aws-amplify'
import config from './aws-exports'
import { Auth } from 'aws-amplify';
Amplify.configure(config)
import 'react-native-gesture-handler';
import * as React from 'react';
import { useEffect, useState } from 'react'
import { View, ScrollView, Dimensions, RefreshControl, Text, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //createAppContainer
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DetailsScreen } from './DetailScreen.js';
import { SettingsPage } from './SettingsPage.js';
import { withAuthenticator } from 'aws-amplify-react-native'
import { Provider } from 'react-redux'; 
import { useSelector, useDispatch } from 'react-redux';
import { updatePrinter } from './updatePrinters.js';
import store from './store.js';
import { fetchPrinters } from './FetchPrinters.js';
import { Ionicons as Icon} from '@expo/vector-icons';
import { darker, lighter } from './Colors.js';
import { YellowBox } from 'react-native';
import { updatePrinterDict } from './updatePrinterDict';
import { EditPrinterView } from './EditPrinterView';
import { EditPrinterNameView } from './EditPrinterNameView.js';
import { LoadingCardsView } from './LoadingCardView';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons';
import ActionSheet from './ActionSheet.js';
import { AsyncStorage } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { RenderButtons } from './RenderButtons.js'
import NetInfo from "@react-native-community/netinfo";
import { CustomLogin } from './CustomLogin.js';
import { Platform } from 'react-native'
import { AppStyles as styles } from './Styles.js';
import { SegmentedControl } from './SegmentedControl.js';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
]);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var isWeb = (Platform.OS == 'web')

const deepLinking = {
  prefixes: ['https://cogniprint.io', 'cogniprint://'],
  config: 
  {
    Home: 
    {
      path: 'Home',
      DetailScreen: 
      {
        path: 'DetailScreen',
        params:
        {
          printer: null,
        },
        screens:
        {
          PrinterSettings: 
          {
            path: 'PrinterSettings',
            screens:
            {
              EditPrinterNameView: 
              {
                path: 'EditPrinterNameView',
                params:
                {
                  printer: null,
                }
              }
            }
          }
        }
      },
      Settings: 'Settings',
    }
  },
}

function HomeScreen({ navigation }) 
{
  const [refreshing, setRefreshing] = useState(false)
  const images = useSelector(state => { return state.imageDict })
  const dispatch = useDispatch()
  const [showActionSheet, setAction] = useState(false)
  const [sortMethod, setMethod] = useState('')
  const [connection, setConnection] = useState(true)

  let sortButtonsDict = { 
    'Failure Risk': <MCI name='shield-alert' size={20} color='#7CFC00' style={{ marginRight: 6 }}/>, 
    'Alphabetical Order' : <Feather name='align-justify' size={20} color='#7CFC00' style={{ marginRight: 6 }}/>  
  }

  function closeActionSheet()
  {
      setAction(false)
  }

  const actionItems = [
    {
      id: 1,
      icon: <MCI name='shield-alert' size={20} color={(sortMethod == 'Failure Risk' ? '#7CFC00' : 'gray')} style={ styles.actionSheetIconStyle }/>,
      label: <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10, color:(sortMethod == 'Failure Risk' ? '#7CFC00' : 'gray') }}>Risk Failure</Text>,
      onPress: () => {
        resortPrintersWith('Failure Risk')
      },
      color: (sortMethod == 'Failure Risk' ? '#7CFC00' : 'gray')
    },
    {
      id: 2,
      icon: <Feather name='align-justify' size={24} color={(sortMethod == 'Alphabetical Order' ? '#7CFC00' : 'gray')} style={ styles.actionSheetIconStyle }/>,
      label: <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10, color: (sortMethod == 'Alphabetical Order' ? '#7CFC00' : 'gray')}}>Alphabetical Order</Text>,
      onPress: () => {
        resortPrintersWith('Alphabetical Order')
      },
      color:(sortMethod == 'Alphabetical Order' ? '#7CFC00' : 'gray')
    },
  ];

  const sortItems = [
    {
      id: 1,
      icon: <MCI name='shield-alert' size={20} color={(sortMethod == 'Failure Risk' ? '#7CFC00' : 'gray')} style={ styles.actionSheetIconStyle }/>,
      label: <Text style={[ styles.segmentedText, { color: (sortMethod == 'Failure Risk' ? '#7CFC00' : 'gray') } ]}>Failure Risk</Text>,
      onPress: () => resortPrintersWith('Failure Risk'),
      style: [ styles.segmentBox, { backgroundColor: (sortMethod == 'Failure Risk' ? lighter['five'] : 'clear') } ]
    },
    {
      id: 2,
      icon: <Feather name='align-justify' size={24} color={(sortMethod == 'Alphabetical Order' ? '#7CFC00' : 'gray')} style={ styles.actionSheetIconStyle }/>,
      label: <Text style={[ styles.segmentedText, { color: (sortMethod == 'Alphabetical Order' ? '#7CFC00' : 'gray') } ]}>Alphabetical Order</Text>,
      onPress: () => resortPrintersWith('Alphabetical Order'),
      style: [ styles.segmentBox, { backgroundColor: (sortMethod == 'Alphabetical Order' ? lighter['five'] : 'clear') } ]
    }
  ]

  //Resorts the printers
  function resortPrintersWith(method)
  {
    setAction(false)
    setMethod(method)
    storeData('sortMethod', method).then(() => onRefresh(method, true))
  }

  //saves user preference
  const storeData = async (key, value) => 
  {
      try 
      {
          await AsyncStorage.setItem(key, value)
      } catch(e) 
      {
          // saving error
          console.log('ERROR SAVING USER PREFERENCE: ', e)
      }
  }

  //retrieves user preference
  const getData = async (key) => 
  {
      try 
      {
          const value = await AsyncStorage.getItem(key)
          
          if (value !== null) 
          {
              // value previously stored
              setMethod(value)
              fetchPrinters(null, false, value)
          }else
          {
            storeData('sortMethod', 'Failure Risk')
            setMethod('Failure Risk')
            fetchPrinters(null, false, 'Failure Risk')
          }
      } catch(e) 
      {
          // error reading value
          console.log('ERROR GETTING USER PREFERENCE: ', e)
      }
  }

  //Refreshes the printers
  function onRefresh(method = sortMethod, isResort)
  {
    setRefreshing(true)

    dispatch(updatePrinter([]))
    dispatch(updatePrinterDict({}))

    fetchPrinters(null, true, method, isResort).then(() => setRefreshing(false))
  }

  useEffect(() => 
  {
    const unsubscribeIfNotWeb = () =>
    {
      if (Platform.OS !== "web")
      {
        const unsubscribe = NetInfo.addEventListener(state => 
        {
          setConnection(state.isInternetReachable)
        })
      }
    }
    
    //Get the saved sort method and then load printers with that sort method
    getData('sortMethod')

    return () => 
    {
      if (Platform.OS !== "web")
      {
        unsubscribeIfNotWeb()
      }
    }
  }, [])

  function SortControls()
  {
    return(
      <React.Fragment>
        {(!isWeb) &&
          <TouchableOpacity onPress={() => setAction(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            {sortButtonsDict[sortMethod]}
            <Text style={{ fontSize: 15, color: '#7CFC00' }}>{sortMethod}</Text>
            <Entypo name='chevron-down' color='#7CFC00' size={20} />
          </TouchableOpacity>
        }
        {(isWeb) &&
          <SegmentedControl sortItems={sortItems} background={styles.segmentedStyle}/>
        }
      </React.Fragment>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: darker['five'], paddingTop: 25 }}>
      {(Object.keys(images).length > 0) &&
        <React.Fragment>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} tintColor='white'/>
            }
          >
            {(connection.isInternetReachable == false) &&
              <View style={{ width: windowWidth - 30, height: Math.round(windowHeight * 0.0246), backgroundColor: 'orange', marginBottom: 5, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  }}>
                <Text style={{ color: 'white', fontSize: 15 }}>Connecting...</Text>
              </View>
            }

            <SortControls/>
            
            <RenderButtons navigation={navigation}/>
          </ScrollView>
          {(!isWeb) &&
            <Modal
              visible={showActionSheet}
              animationType='slide'
              transparent={true}
            >
              <ActionSheet
                  actionItems={actionItems}
                  onCancel={closeActionSheet}
                  title='SORT BY'
              />
            </Modal>
          }
        </React.Fragment>
      }
      {(Object.keys(images).length == 0) &&
        <LoadingCardsView/>
      }
    </View>
  );
}



const Stack = createStackNavigator();

function App({ navigation }) 
{
  var headerHeight = (windowWidth > 700 ? 125 : windowHeight/6.7)
  /* IDEA: To get rid of that white screen caused by the linking on mobile, maybe have two seperate navigation containters and depending on the platform is uses either the web container or the app container */
  return (
    <Provider store={store}>
      <NavigationContainer linking={deepLinking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Printers" 
            component={HomeScreen}  
            options={({ navigation }) => ({
              title: 'Printers',
              headerStyle: 
              {
                backgroundColor: 'rgb(21, 34, 56)',
                height: headerHeight,
                shadowColor: 'transparent'
              },
              headerTintColor: '#fff',
              headerTitleStyle: 
              {
                fontWeight: 'bold',
                fontSize:30,
                marginTop:30
              },
              headerTitleAlign: "left",
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Icon name='ios-settings' size={32} color='#7CFC00' style={{ marginRight: 20, marginTop: 20 }} />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen 
            name="Detail Screen" 
            component={DetailsScreen}
            options={({ route, navigation }) => 
            ({
              headerStyle: 
              {
                backgroundColor: 'rgb(21, 34, 56)',
                height: headerHeight,
                shadowColor: 'transparent'
              },
              headerTintColor: '#fff',
              headerTitleStyle: 
              {
                fontWeight: 'normal',
              },
              headerTitleAlign: "center",
              title: route.params.printer.name,
              headerBackTitleVisible: false,
              headerTintColor: '#7CFC00',
              headerTitleStyle: { color: 'white' },
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Printer Settings', { printer: route.params.printer})}>
                  <MCI name='pencil' size={32} color='#7CFC00' style={{ marginRight: 20, marginTop: 10 }} />
                </TouchableOpacity>
              ),
              path: 'Detail Screen'
            })}
            
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsPage}
            options={({ route }) => 
            ({
              headerStyle: 
              {
                backgroundColor: 'rgb(21, 34, 56)',
                height: headerHeight,
                shadowColor: 'transparent'
              },
              headerTintColor: '#fff',
              headerTitleStyle: 
              {
                fontWeight: 'bold',
              },
              headerTitleAlign: "center",
              headerBackTitleVisible: false,
              headerTintColor: '#7CFC00',
              headerTitleStyle: { color: 'white' }
            })}
          />
          <Stack.Screen
            name="Printer Settings" 
            component={EditPrinterView}
            options={({ route }) => 
            ({
              headerStyle: 
              {
                backgroundColor: 'rgb(21, 34, 56)',
                height: headerHeight,
                shadowColor: 'transparent'
              },
              headerTintColor: '#fff',
              headerTitleStyle: 
              {
                fontWeight: 'normal',
              },
              headerTitleAlign: "center",
              headerBackTitleVisible: false,
              headerTintColor: '#7CFC00',
              headerTitleStyle: { color: 'white' },
            })}
          />
          <Stack.Screen
            name="Edit Printer Name" 
            component={EditPrinterNameView}
            options={({ route }) => 
            ({
              headerStyle: 
              {
                backgroundColor: 'rgb(21, 34, 56)',
                height: headerHeight,
                shadowColor: 'transparent'
              },
              headerTintColor: '#fff',
              headerTitleStyle: 
              {
                fontWeight: 'normal',
              },
              headerTitleAlign: "center",
              headerBackTitleVisible: false,
              headerTintColor: '#7CFC00',
              headerTitleStyle: { color: 'white' },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default withAuthenticator(App, false, [
  <CustomLogin/>
]);

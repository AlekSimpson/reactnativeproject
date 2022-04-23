import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, Switch, Modal } from 'react-native';
import { Divider } from './Divider.js';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { updatePrinter } from './updatePrinters.js';
import { useEffect, useState, useReducer } from 'react'
import ActionSheet from './ActionSheet.js';
import { Ionicons as Icon} from '@expo/vector-icons';
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons';
import { AntDesign as AD} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as mutations from './graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";
import { EditPrinterViewStyles as styles } from './Styles.js'
import { Platform } from 'react-native'
import { SegmentedControl } from './SegmentedControl.js';
import { AppStyles } from './Styles.js';
import { lighter } from './Colors.js';

const windowWidth = Dimensions.get('window').width;

const sensCodes = { 0: 'Low', 1: 'Medium', 2: 'High' }

function EditPrinterView({route, navigation})
{
    var temp;
    const { printer } = route.params;

    const listPrinters = useSelector(state => { temp = [...state.listP]; return state.listP })
    const dispatch = useDispatch()
    const [actionSheet, setActionSheet] = useState(false)

    const closeActionSheet = () => setActionSheet(false)

    const actionItems = [
        {
          id: 1,
          label: <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10, color:(sensCodes[printer.sensitivity] == 'Low' ? '#7CFC00' : 'gray') }}>Low</Text>,
          onPress: () => {
            updateSens(0)
          }
        },
        {
          id: 2,
          label: <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10, color:(sensCodes[printer.sensitivity] == 'Medium' ? '#7CFC00' : 'gray') }}>Medium</Text>,
          onPress: () => {
            updateSens(1)
          }
        },
        {
          id: 3,
          label: <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10, color:(sensCodes[printer.sensitivity] == 'High' ? '#7CFC00' : 'gray') }}>High</Text>,
          onPress: () => {
            updateSens(2)
          }
        },
    ];
    
    const sortItems = [
        {
            id: 1,
            label: <Text style={[ AppStyles.segmentedText, { color:(sensCodes[printer.sensitivity] == 'Low' ? '#7CFC00' : 'gray') } ]}>Low</Text>,
            onPress: () => updateSens(0),
            style: [ AppStyles.segmentBox, { backgroundColor: (sensCodes[printer.sensitivity] == 'Low' ? lighter['five'] : 'clear') } ]
        },
        {
            id: 2,
            label: <Text style={[ AppStyles.segmentedText, { color:(sensCodes[printer.sensitivity] == 'Medium' ? '#7CFC00' : 'gray') } ]}>Medium</Text>,
            onPress: () => updateSens(1),
            style: [ AppStyles.segmentBox, { backgroundColor: (sensCodes[printer.sensitivity] == 'Medium' ? lighter['five'] : 'clear') } ]
        },
        {
            id: 3,
            label: <Text style={[ AppStyles.segmentedText, { color:(sensCodes[printer.sensitivity] == 'High' ? '#7CFC00' : 'gray') } ]}>High</Text>,
            onPress: () => updateSens(2),
            style: [ AppStyles.segmentBox, { backgroundColor: (sensCodes[printer.sensitivity] == 'High' ? lighter['five'] : 'clear') } ]
        }
    ]

    var newDict = {}
    listPrinters.map((printer, index) => 
    {
        newDict[printer.name] = index
    })


    //Updates the sensitivity of the printer
    async function updateSens(newValue)
    {
        var i = newDict[printer.name]

        closeActionSheet()

        temp[i].sensitivity = newValue

        //Mutate API
        const update = await API.graphql(graphqlOperation(mutations.updatePrinter, {input: temp[i]}));

        dispatch(updatePrinter(temp))
    }

    let i = newDict[printer.name]
    var displayedPrinter = listPrinters[i]
    var isWeb = (Platform.OS == 'web')
    const width = (windowWidth >= 700 ? (windowWidth / 3) : windowWidth)

    return(
        <React.Fragment>
            <View style={ styles.container }>
                <Text style={ styles.text }>Printer Options</Text>
                <View style={ styles.backgroundColor }>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Edit Printer Name', { printer: printer })} >
                        <MCI name='printer-3d-nozzle' size={20} color='#7CFC00' style={{ marginLeft: 10, marginTop: 15 }} />
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 10, marginTop: 15, marginBottom: 10 }}>Name: { displayedPrinter.name }</Text>
                        <Icon name='md-arrow-forward' size={32} color='#7CFC00' style={{ position: 'absolute', right: 0, marginRight: 10, marginTop: 10 }}/>
                    </TouchableOpacity>
                    <Divider width={width - 20}/>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setActionSheet(true)}>
                        <AD name='dashboard' size={20} color='#7CFC00' style={{ marginLeft: 10, marginTop: 15 }} />
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 10, marginTop: 15, marginBottom: 10 }}>Sensitivity</Text>
                        {(isWeb) &&
                            <SegmentedControl sortItems={sortItems} background={ styles.segmentedStyle }/>
                        }
                        {(!isWeb) &&
                            <SensIndicator style={{ position: 'absolute', right: 0 }} printer={printer} />
                        }
                    </TouchableOpacity>
                    <Divider width={width - 20}/>
                    <SwitchView text={'Notify on failure'} printer={printer} icon={'message-alert'} />
                    <Divider width={width - 20}/>
                    <SwitchView text={'Pause on failure'} printer={printer}  icon={'pause-circle'} />
                </View>
                {(!isWeb) &&
                    <Modal
                        visible={actionSheet}
                        animationType='slide'
                        transparent={true}
                    >
                        <ActionSheet
                            actionItems={actionItems}
                            onCancel={closeActionSheet}
                            title='SENSETIVITY'
                        />
                    </Modal>
                }
                
            </View>
        </React.Fragment>
    )
}

function SensIndicator(props)
{
    return(
        <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
            <Text style={{ color: '#7CFC00', fontSize: 13, marginRight: 5, marginTop: 17 }}>{sensCodes[props.printer.sensitivity]}</Text>
            <Entypo name='chevron-down' color='#7CFC00' size={20} style={{ marginRight: 10, marginTop: 15 }}/>
        </View>
    )
}

function SwitchView(props)
{
    var OFcodes = { 'Notify on failure':props.printer.notifyOnFail, 'Pause on failure':props.printer.pauseOnFail }
    var printer = props.printer
    var temp;
    const listPrinters = useSelector(state => { temp = [...state.listP]; return state.listP })
    const dispatch = useDispatch()

    const [switchBool, setBool] = useState(OFcodes[props.text])

    var newDict = {}
    listPrinters.map((printer, index) => 
    {
        newDict[printer.name] = index
    })

    var i = newDict[printer.name]

    //Updates the notify on fail setting
    function updateNOF(newValue)
    {
        if (props.text == 'Notify on failure')
        {
            temp[i].notifyOnFail = newValue
        }else 
        {
            temp[i].pauseOnFail = newValue
        }

        dispatch(updatePrinter(temp))

        setBool(newValue)
    }

    async function updateAndMutate(newValue)
    {
        updateNOF(newValue)

        //Mutate API
        const update = await API.graphql(graphqlOperation(mutations.updatePrinter, {input: temp[i]}));
    }

    return(
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <MCI name={props.icon} size={20} color='#7CFC00' style={{ marginLeft: 10, }} />
            <Text style={{ color: 'white', fontSize: 15, marginLeft: 10, marginTop: 15, marginBottom: 10 }}>{props.text}</Text>
            <Switch
                style={{marginRight: 10, position: 'absolute', right: 0 }}
                trackColor={{ false: 'gray', true: '#64bd62' }}
                thumbColor="white"
                ios_backgroundColor="gray"
                onValueChange={(value) => { updateAndMutate(value) }}
                value={switchBool}
            />
        </View>
    )
}

export { EditPrinterView };
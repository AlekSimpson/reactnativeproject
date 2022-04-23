import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, Switch, TextInput } from 'react-native';
import { useEffect, useState, useReducer } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { updatePrinter } from './updatePrinters.js';
import { EditPrinterNameViewStyles as styles } from './Styles.js'
import { useNavigation } from '@react-navigation/native';

function EditPrinterNameView(props)
{
    var printer = props.route.params.printer
    var temp;
    const listPrinters = useSelector(state => { temp = [...state.listP] ; return state.listP })
    const dispatch = useDispatch()
    const [value, onChangeText] = useState(printer.name);
    const navigation = useNavigation();

    var newDict = {}
    
    //Maps printers to their index
    listPrinters.map((printer, index) => 
    {
        newDict[printer.name] = index
    })

    //Updates the global state of a certain printer
    function updateName(newName)
    {
        var printerArray = [...listPrinters]
        let i = newDict[printer.name]

        if (passesChecks(printerArray[i], newName))
        {
            printerArray[i].name = newName

            dispatch(updatePrinter(printerArray))
        }

        navigation.goBack()
    }

    //Checks to see if the name is not the same as another printer and is not greater than or equal to 20 characters
    function passesChecks(printer, newName)
    {
        var returnVal = true;

        for (var i = 0; i < listPrinters.length; i++)
        {
            if ((newName == listPrinters[i].name) && (printer.id != listPrinters[i].id) && (newName.length <= 20))
            {
                returnVal = false
                break
            }
        }

        return returnVal
    }

    return(
        <View style={ styles.container }>
            <TextInput
                style={ styles.textInput }
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <View style={styles.buttonsView} >
                <TouchableOpacity style={[styles.button, { padding: '9%', backgroundColor: 'red' }]} onPress={() => navigation.goBack()}>
                    <Text style={{ color: 'black' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { padding: '10%', backgroundColor: 'rgb(32, 51, 84)' }]} onPress={() => updateName(value)}>
                    <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export { EditPrinterNameView };
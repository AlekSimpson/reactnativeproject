import * as React from 'react';
import { useEffect, useState, useReducer } from 'react'
import { Text, Dimensions, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updatePrinter } from './updatePrinters.js';
import { Divider } from './Divider.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 as FA } from '@expo/vector-icons';
import ActionSheet from './ActionSheet.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CircleDiameter = (windowWidth / 1.5)

let toggleControlCodes = { 2: 3, 3: 2 }

class ButtonInfo
{
  constructor(title, icon)
  {
    this.buttonTitle = title;
    this.buttonIcon = icon;
  }
}

var infoDict = { 2: new ButtonInfo('Play', 'play'), 3: new ButtonInfo('Pause', 'pause') }

function PauseOrCancelView(printer)
{
  //Action Items to present on the confirm cancel modal
  const actionItems = [
    {
      id: 1,
      label: <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 10, color: 'red' }}>Confirm Cancel</Text>,
      onPress: () => {
        updateStatus(1)
      }
    },
  ];

  var temp;
  const dispatch = useDispatch()

  const closeActionSheet = () => setConfirmCancel(false)

  const [showConfirmCancel, setConfirmCancel] = useState(false)

  var newDict = {}
  listPrinters.map((printer, index) => 
  {
      newDict[printer.name] = index
  })

  //Updates the printer status to either pause or play 
  function updateStatus(newStatus)
  {
    let i = newDict[printer.name]

    temp[i].status = newStatus

    dispatch(updatePrinter(temp))
    printer.toggleShowPause()
  }

  //Cancel button should go to the confirm cancel view, action for cancel button //updateStatus(1)
  return(
    <React.Fragment>
      <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'leading', justifyContent: 'leading', marginBottom: 15, marginLeft: windowWidth / 7 }} onPress={() => updateStatus(toggleControlCodes[printer.printer.status])}>
        <FA name={infoDict[printer.printer.status].buttonIcon} color='white' size={35}/>
        <Text style={{ color: 'white', fontSize: 25, marginLeft: 10, marginTop: 5 }}>{infoDict[printer.printer.status].buttonTitle}</Text>
      </TouchableOpacity>

      <Divider width={CircleDiameter - 20}/>

      <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'leading', justifyContent: 'leading', marginTop: 15, marginLeft: windowWidth / 7  }} onPress={() => setConfirmCancel(true)}>
        <FA name='stop' color='red' size={35}/>
        <Text style={{ color: 'red', fontSize: 25, marginLeft: 10, marginTop: 5 }}>Cancel</Text>
      </TouchableOpacity>
      <Modal
        visible={showConfirmCancel}
        animationType='slide'
        transparent={true}
      >
        <ActionSheet
          actionItems={actionItems}
          onCancel={closeActionSheet}
          title='CONFIRM'
        />
      </Modal>
    </React.Fragment>
  )
}

export {PauseOrCancelView};
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from './Divider.js';
import { ActionSheetStyles as styles } from './Styles.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ActionSheet = (props) => {
  const { actionItems } = props;
  
  const actionSheetItems = [...actionItems]
  
  return (
    <React.Fragment>
      <View style={styles.centeredView}>
        <View style={{
            flexDirection: 'column',
            margin: 20,
            backgroundColor: "rgb(28, 46, 74)",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: 
            {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            width: windowWidth - 20,
            position: 'absolute',
            bottom: 0,
          }}
        >
          <Text style={{ color: 'gray', fontSize: 15, marginTop: 10, marginLeft: 10 }}>{props.title}</Text>
          <Divider width={windowWidth - 20}/>
          {
            actionSheetItems.map((actionItem, index) => 
            {
              return(
                <TouchableOpacity onPress={actionItem.onPress} key={index} style={{ flexDirection: 'row', marginTop: 1, marginBottom: 1 }}>
                  {(actionItem.icon !== null)&&
                    actionItem.icon
                  }
                  {actionItem.label}
                </TouchableOpacity>
              )
            })
          }
          <TouchableOpacity onPress={() => props.onCancel()}>
            <View style={{ backgroundColor: 'rgb(32, 51, 84)', borderRadius: 20, width: windowWidth - 30, height: (windowHeight / 15), marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' , alignSelf: 'center', }}>
              <Text style={styles.cancelButton}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  )
}

ActionSheet.propTypes = {
  actionItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      icon: PropTypes.any,
      label: PropTypes.any,
      onPress: PropTypes.func,
      color: PropTypes.string
    })
  ).isRequired,
  onCancel: PropTypes.func,
}


ActionSheet.defaultProps = {
  actionItems: [],
  onCancel: () => { },
}


export default ActionSheet;
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from './Divider.js';
import { AppStyles as styles } from './Styles.js'

function SegmentedControl(props)
{
    const { sortItems } = props;

    const { background } = props;

    const sortSheetItems = [...sortItems]

    return(
        <View style={ background }>
            {
                sortSheetItems.map((sortItem, index) => 
                {
                    return(
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={sortItem.onPress} key={index}>
                            <View style={ sortItem.style }>
                                {sortItem.icon}
                                {sortItem.label}
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

SegmentedControl.propTypes = {
    sortItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            icon: PropTypes.any,
            label: PropTypes.any,
            onPress: PropTypes.func,
            style: PropTypes.string
        })
    ).isRequired,
}


SegmentedControl.defaultProps = {
    sortItems: [],
}

export { SegmentedControl };
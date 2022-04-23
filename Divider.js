import * as React from 'react';
import { View } from 'react-native';

function Divider(props)
{
  return(
    <View
      style={{
        backgroundColor: 'gray',
        height: 0.5,
        width: props.width,
        marginTop: 10,
      }}
    />
  )
}

export { Divider };
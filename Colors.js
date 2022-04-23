import * as React from 'react';

export const darker = { 'one': 'rgb(35, 57, 109)', 'two': 'rgb(32, 51, 84)', 'three': 'rgb(28, 46, 74)', 'four':'rgb(25, 40, 65)', 'five':'rgb(21, 34, 56)' }

export const lighter = { 'one':'rgb(123, 136, 158)', 'two':'rgb(101, 116, 142)', 'three':'rgb(79, 97, 125)', 'four':'rgb(57, 77, 109)', 'five':'rgb(35, 57, 93)' }

//Gets the gradient color based on the algorithms percent confidence of failure
export function getColor(num)
{
    let red = Math.min(2.0 * num * (185.0 + 60.0), 245.0)
    let floorVal = Math.floor((255.0 * red)/245.0)
    let failConfSubtraction = num - 0.5
    let multiply = 185.0 * 2.0
    let green = Math.max(245.0 - (floorVal * multiply * failConfSubtraction), 160.0)

    return 'rgb(', red,', ', green,', ', 60.0/255.0,')'
}

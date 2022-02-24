import React from 'react';
import {Text} from 'react-native';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';

export default TextComponent = (props) => {
    return (
        //props.bgColor ||
        props.bgColor == '#E56A6A'? <Text style={{color:colors.WHITE_COLOR,fontFamily: fonts('poppinsSemibold')}}>{props.title}</Text>: <Text style={{color:  colors.WHITE_COLOR,fontFamily: fonts('poppinsSemibold'),}}>{props.title}</Text> 
        
    )
}
import Amplify, { Storage } from 'aws-amplify'
import config from './aws-exports'
import { Auth } from 'aws-amplify';
Amplify.configure(config)
import 'react-native-gesture-handler';
import * as React from 'react';
import { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons as Icon} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomLoginStyles as styles } from './Styles.js'
import * as Linking from 'expo-linking';
import { darker } from './Colors.js';
import { Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const isWeb = (Platform.OS == 'web')

//Checks credentials and signs user in
async function signIn(username, password, handleError) 
{
    if (username != '' && password != '')
    {
        try 
        {
            const user = await Auth.signIn(username, password);
        } catch (error) 
        {
            handleError()
            console.log('error signing in', error);
        }
    }else 
    {
        handleError()
        console.log('username or password is empty')
    }
}

//Shows a gradient button
function GradientButton({title, width, height, fontSize, top, onPress})
{
    return(
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={['rgb(44, 102, 98)', 'rgb(66, 138, 69)']}
                style={{
                    width: width,
                    height: height,
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginTop: top
                }}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
            >
                <Text style={{ color: 'white', fontSize: fontSize }} >{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

//Shows a text input
function IconTextInput({ holder, icon, handleChange, secure, capitalize, keyboardType })
{
    return(
        <View style={ styles.SectionStyle }>
            
            {icon}
            <TextInput
                style={[ styles.textInput, { outline: 'none' } ]}
                onChangeText={text => handleChange(text)}
                placeholder={holder}
                placeholderTextColor='gray'
                autoCapitalize={capitalize}
                secureTextEntry={secure}
                keyboardType={keyboardType}
            />
        </View>
    )
}

function CustomLogin()
{
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [incorrectCredential, setIncorrect] = useState(0)
    const [startingUp, setStarting] = useState(true)

    let gradientStyle = (isWeb ? styles.GradientWebstyles : styles.GradientMobileStyles)

    let mounted = true

    function stopLoading()
    {
        setIncorrect(100)
        setLoading(false)
    }

    function stopStartup()
    {
        if (mounted)
        {
            setStarting(false)
        }
    }

    useEffect(() => 
    {
        setTimeout(stopStartup, 2000)
        return () => mounted = false;
    }, [])

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: darker['five'], paddingTop: 25, width: windowWidth, height: windowHeight }}>
            {(startingUp) &&
                <LinearGradient
                    colors={['rgb(38, 85, 111)', 'rgb(72, 67, 118)']}
                    style={ gradientStyle }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Image source={require('./LocalAssets/CogniprintLogo.png')} style={styles.logo} />
                </LinearGradient>
            }
            {(!startingUp) &&
                <LinearGradient
                    colors={['rgb(38, 85, 111)', 'rgb(72, 67, 118)']}
                    style={ gradientStyle }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Image source={require('./LocalAssets/CogniprintLogo.png')} style={styles.logo} />
                    <IconTextInput holder={'Email'} icon={<Icon name='md-person' size={20} color='white' style={{ marginLeft: 40 }} />} handleChange={setUser} capitalize={'none'} secure={false} keyboardType={'email-address'} />
                    <IconTextInput holder={'Password'} icon={<Entypo name='lock' size={20} color='white' style={{ marginLeft: 40 }} />} handleChange={setPassword} capitalize={'sentences'} secure={true} keyboardType={'default'} />
                    {(!loading) &&
                        <GradientButton title='Login' width={150} height={50} fontSize={20} top={40} onPress={() => { setLoading(true); signIn(username, password, stopLoading)}} />
                    }
                    {(loading) &&
                        <ActivityIndicator color={'white'} size={50} marginTop={40}/>
                    }
                    <Text style={{ fontSize: 15, color: 'red', marginTop: 15, opacity: incorrectCredential }}>Incorrect email or password</Text> 
                    <Text style={{ color: 'white', fontSize: 15, marginTop: 100 }} >Don't have an account?</Text>
                    <GradientButton title='Sign Up' width={110} height={45} fontSize={15} top={20} onPress={ () => (Linking.openURL('https://cogniprint-auth-cogniprint.auth.eu-west-1.amazoncognito.com/signup?client_id=5cmai5cauck3t88c6rrei6bvq2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost/')) } />
                </LinearGradient>
            }
        </View>
    )
}

export { CustomLogin };
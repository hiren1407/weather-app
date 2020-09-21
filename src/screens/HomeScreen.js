import React,{useState,useEffect} from 'react'
import { TextInput,Button,Card,Title} from 'react-native-paper';
import {View,Text,FlatList,Image} from 'react-native'
import { AsyncStorage } from 'react-native';

import Header from '../components/Header'
const HomeScreen=(props)=>{

    const [info,setInfo]=useState({
        name:"loading !!",
        temp:"loading",
        humidity:"loading",
        desc:"loading",
        icon:"loading"
    })

    useEffect(()=>{
        getWeather()
     },[])


     const getWeather = async ()=>{
           let MyCity = await AsyncStorage.getItem("newcity")
           if(!MyCity){
        
           const city = props.navigation.getParam('city')
           MyCity = city  
           }
        
       

     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=4625f2b9e8fbe3ca5e33466dfd30a29b&units=metric`)
     .then(data=>data.json())
     .then(results=>{
        setInfo({
            name:results.name,
            temp:results.main.temp,
            humidity:results.main.humidity,
            desc:results.weather[0].description,
            icon:results.weather[0].icon,
        })
     })
     .catch(err=>{
         alert(err.message)
     })
    }


     if(props.navigation.getParam('city') != "london"){
        getWeather()
    }
    return(
        <View style={{flex:1}}>
            <Header name="Weather App" />
           <View style={{alignItems:"center"}}>
               <Title 
               style={{
                   color:'black',
                   marginTop:30,
                   fontSize:30
               }}>
                   {info.name}
               </Title>
               <Image 
               style={{
                   width:120,
                   height:120
               }}
               source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}}
               
               />

           </View>

           <Card style={{
               margin:5,
               padding:12
           }}>
           <Title style={{color:"black"}}>Temperature - {info.temp}</Title>
           </Card>
           <Card style={{
               margin:5,
               padding:12
           }}>
           <Title style={{color:"black"}}>Humidity - {info.humidity}</Title>
           </Card>
           <Card style={{
               margin:5,
               padding:12
           }}>
           <Title style={{color:"black"}}>Description-  {info.desc}</Title>
           </Card>
        </View>
    )
}

export default HomeScreen
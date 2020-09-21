import React,{useState} from 'react'
import { TextInput,Button,Card} from 'react-native-paper';
import {View,Text,FlatList} from 'react-native'
import Header from '../components/Header'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { AsyncStorage } from 'react-native';

const SearchScreen=({navigation})=>{

    const [city,setCity] = useState('')
    const [cities,setCities] = useState([])
    const fetchCities = (text)=>{
        setCity(text)

        fetch("https://api.locationiq.com/v1/autocomplete.php?key=4bf10683e66f2d&q="+text)
.then(response =>response.json())
.then(res=>setCities(res.slice(0,9)))
.catch(err => {
	console.log(err);
});
    //     fetch("https://autocomplete.wunderground.com/aq?query="+text)
    //     .then(item=>item.json())
    //     .then(cityData=>{
    //         console.log(cityData,"hi")
    //         setCities(cityData.RESULTS.slice(0,9))
    //     })
    //     .catch(err=>console.log(err))
    }
    const btnClick = async ()=>{
        await AsyncStorage.setItem("newcity",city)
        navigation.navigate("Home",{city:city})
    }
    const listClick = async (cityname)=>{
        setCity(cityname)
        await AsyncStorage.setItem("newcity",cityname)
        navigation.navigate("Home",{city:cityname})
    }
    return (
     <View style={{flex:1}}>
         <Header name="Search Screen" />
          <TextInput
           label="city name"
           theme={{colors:{primary:"darkblue"}}}
           value={city}
           onChangeText={(text)=>fetchCities(text)}
          />
          
          <Button
           icon="content-save"
           mode="contained" 
           theme={{colors:{primary:"darkblue"}}}
           style={{margin:20}}
           onPress={() => btnClick()}>
          <Text style={{color:"white"}}>save changes</Text> 

        </Button>
        <FlatList
        data={cities}
        renderItem={({item})=>{
            return(
                <Card 
                 style={{margin:2,padding:12}}
                 onPress={()=>listClick(item.address.name)}
                >
                    <Text>{item.address.name}</Text>
                </Card>
            )
        }}
        keyExtractor={item=>item.place_id}
        />

     </View>
    );
 
}

export default SearchScreen
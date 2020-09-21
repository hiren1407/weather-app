import React from 'react'
import { Appbar ,Title} from 'react-native-paper'

const Header=(props)=>{
    return(
        <Appbar.Header 
        theme={{
            colors:{
                primary:"darkblue",
               
            }
        
        }}
        style={{flexDirection:"row",justifyContent:"center"}}
        >
         <Title style={{color:"white"}}>
             {props.name}
         </Title>
          
        </Appbar.Header>
      );
    
}

export default Header
import React from 'react';
import {View,
Text,
StyleSheet
} from 'react-native';

const Header= props =>{
return(
    <View style={styles.container}>
        <Text style={styles.txt}>EXPENSE MANAGER</Text>
    </View>
)
};

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    txt:{
        backgroundColor:'#b5c5e3',
        color:'black',
        fontSize:30
    }
});

export default Header;
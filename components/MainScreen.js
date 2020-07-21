import React, {useState, useEffect} from 'react';
import {View,
        Text,
        StyleSheet,
        TextInput,
        TouchableOpacity,
        Button
} from 'react-native';
import Header from './Header';

const MainScreen= () =>{
    const [a,setA]= useState('');
    const [b,setB]= useState('');
    const [aInp1,setAInp1]=useState(0);
    const [aInp2,setAInp2]=useState(0);
    const [aInp3,setAInp3]=useState(0);
    const [bInp1,setBInp1]=useState(0);
    const [bInp2,setBInp2]=useState(0);
    const [bInp3,setBInp3]=useState(0);
    const [user,setUser]= useState('');
    const [diff,setDiff]= useState();
    const [visible,setVisible]= useState(false);
    const [factor,setFactor]= useState(1);
    const [identifier, setIdentifier]= useState(0);
    const [currency, setCurrency] = useState("USD");
    const [INR,setINR]= useState();
    const[USD,setUSD]= useState();

    useEffect( ()=> {
            fetch("https://api.exchangeratesapi.io/latest")
            .then((response)=> response.json())
            .then((data)=> {
                setINR(parseFloat(data.rates.INR));
                setUSD(parseFloat(data.rates.USD));
        })
    },[]);

    useEffect( ()=> {
        
            console.log(factor);
            console.log(USD/INR);
            console.log(aInp1+" "+aInp2+" "+aInp3+" "+bInp1+" "+bInp2+" "+bInp3+" "+factor+" "+identifier);
        
        
    },[identifier]);
    
    const calc = ()=>{
        let aExpense= aInp1+aInp2+aInp3;
        let bExpense= bInp1+bInp2+bInp3;
        if(aExpense > bExpense){
            setUser(a);
            setDiff(aExpense-bExpense);
            setVisible(true);
        }
        else if(bExpense > aExpense){
            setUser(b);
            setDiff(bExpense-aExpense);
            setVisible(true);
        }
        else if(aExpense === bExpense){
            setUser('');
            setDiff();
            setVisible(false);
        }
        
    }

    const changeCurrency= () =>{
        
        if((identifier%2) == 0){
            setIdentifier(identifier+1);
            setCurrency("INR");
            setFactor(USD/INR);
            setAInp1(aInp1*factor);
            setAInp2(aInp2*factor);
            setAInp2(aInp3*factor);
            setBInp1(bInp1*factor);
            setBInp2(bInp2*factor);
            setBInp3(bInp3*factor);
            calc;
            console.log("In if");
        }
        else{
            setIdentifier(identifier+1);
            setCurrency("USD");
            setAInp1(aInp1/factor);
            setAInp2(aInp2/factor);
            setAInp2(aInp3/factor);
            setBInp1(bInp1/factor);
            setBInp2(bInp2/factor);
            setBInp3(bInp3/factor);
            setFactor(1);
            calc;
            console.log("In else");
        }
    }

    return(
        <View style={styles.container}>

            <View style={styles.header}> 
                <Header/>
            </View>

            <View style={styles.users}>
                <TextInput style={styles.txtInput}
                onChangeText={(text)=>setA(text)}
                placeholder="User A"
                placeholderTextColor='white'
                value={a}/>
                <TextInput style={styles.txtInput}
                onChangeText={(text)=>setB(text)}
                placeholder="User B"
                placeholderTextColor='white'
                value={b}/>
            </View>

            <View style={styles.expenses}>
                <TextInput style={styles.expensesInp}
                onChangeText={(text)=>setAInp1(parseFloat(text))}
                value={aInp1}
                keyboardType='numeric'
                onSubmitEditing={calc}/>
                <TextInput style={styles.expensesInp}
                onChangeText={(text)=>setBInp1(parseFloat(text))}
                value={bInp1}
                keyboardType='numeric'
                onSubmitEditing={calc}/>
            </View>

            <View style={styles.expenses}>
                <TextInput style={styles.expensesInp}
                onChangeText={(text)=>setAInp2(parseFloat(text))}
                value={aInp2}
                keyboardType='numeric'
                onSubmitEditing={calc}/>
                <TextInput style={styles.expensesInp}
                onChangeText={(text)=>setBInp2(parseFloat(text))}
                value={bInp2}
                keyboardType='numeric'
                onSubmitEditing={calc}/>
            </View>

            <View style={styles.expenses}>
                <TextInput style={styles.expensesInp}
                onChangeText={(text)=>setAInp3(parseFloat(text))}
                value={aInp3}
                keyboardType='numeric'
                onSubmitEditing={calc}/>
                <TextInput style={styles.expensesInp}
                onChangeText={(text)=>setBInp3(parseFloat(text))}
                value={bInp3}
                keyboardType='numeric'
                onSubmitEditing={calc}/>
            </View>
            
            <View style={styles.btnContainer}>
                <Button title={currency}
                onPress={changeCurrency}
                style={styles.btn}/>
            </View>
            
            <View>
                {visible && (
                    <TouchableOpacity  style={styles.result}>
                        <Text style={styles.resText}>{user}</Text>
                        <Text style={styles.resNum}>{diff}</Text>
                    </TouchableOpacity>
                )}
            </View>

           
        </View>
    )
};

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        justifyContent:'center',
        alignItems:'stretch',
        marginTop:50
    },
    users:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:80,
        marginBottom:50
    },
    txtInput:{
        height:50,
        width:160,
        fontSize:35,
        textAlign:'center',
        backgroundColor:'#b5c5e3'
    },
    expenses:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:20
    },
    expensesInp:{
        height:50,
        width:160,
        fontSize:35,
        textAlign:'center',
        color:'#4da6ff'
    },
    result:{
        alignItems:'center',
        marginTop:40
    },
    resText:{
        color:'black',
        backgroundColor:'#b5c5e3',
        fontSize:35,
        paddingHorizontal:50
    },
    resNum:{
        fontSize:35,
        color:'#4da6ff'
    },
    btnContainer:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    btn:{
        width:65,
        height:30
    }

});

export default MainScreen;
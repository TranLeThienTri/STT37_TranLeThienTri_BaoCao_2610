import { Text, View, StyleSheet, Image, TextInput,FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Footer from './footer'
export default function Screen() {

  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(()=>{
    axios.get("https://6714c6e3690bf212c7626d92.mockapi.io/categories").then((resp)=>{
      setCategories(resp.data);
    });
    axios.get("https://6714c6e3690bf212c7626d92.mockapi.io/location").then((resp)=>{
      setLocation(resp.data);
    })
  },[])

  return (
    <View style={styles.container}>
    {/* begin header */}
    <View style={styles.header}> 
      <View style={styles.headerAbow}>
        <Image style={styles.iconLogo} source={require("../assets/logoicon.png")}/>
        {/* input */}
        <View style={styles.input}>
          <TextInput 
            placeholder="Search here ..."
            placeholderTextColor="#bbb"
          />
          <Image source={require("../assets/findicon.png")}/>
        </View>
      </View>
      <View style={styles.headerBelow}>
        <Image style={styles.iconLogo} source={require("../assets/personicon.png")}/>
        <View>
          <Text style={{color: "#fff", fontSize: 20, fontWeight: 700}}>Welcome!</Text>
          <Text style={{color: "#fff", fontSize: 16, fontWeight: 500}}>Donna Stroupe</Text>
        </View>
        <Image style={{marginLeft: 100}} source={require("../assets/ringicon.png")}/>
      </View>
    </View>
    {/* end header */}
    {/* start body */}
    <View style={styles.body}>
      <View style={styles.categoryContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:"center"}}>
          <Text style={{fontSize: 20, fontWeight: 600}}>Category</Text>
          <Image style={{width: 30, height: 30}} source={require("../assets/3gach.png")}/>
        </View>
        <FlatList 
        style={styles.categoryItem}
          data={categories}
          numColumns={4}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View>
              <Image style={{width: 50, height: 50}} source={{uri: item.image}} resizeMode="contain"/>
              <Text>{item.name}</Text>
            </View>
          )}
         />
      </View>
      <View style={styles.popularContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:"center"}}>
          <Text style={{fontSize: 20, fontWeight: 600, alignItems: 'center'}}>Popular Destination</Text>
          <Image style={{width: 30, height: 30}} source={require("../assets/3gach.png")}/>
          </View>
          <View>
          <FlatList
            data={location.slice(0,3)}
            keyExtractor={item=> item.id}
            renderItem={({item})=>(
              <Image style={{width: 50, height: 50}} source={{uri: item.image}} resizeMode="contain"/>
            )}
            numColumns={3}
          />
        </View>
      </View>
      <View>
        <Text>Recommended</Text>
        <FlatList
          data={location.slice(3,5)}
          keyExtractor={i=> i.id}
          numColumns={2}
          renderItem={({item})=>(
              <Image style={{width: 50, height: 50}} source={{uri: item.image}} resizeMode="contain"/>
            )}
        />
      </View>
    </View>
    {/* end body */}
    <Footer/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
  },
  header:{
    backgroundColor: "#5958b2",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: 'center',
  },
  headerAbow:{
    flexDirection:"row",
    marginBottom: 20
  },
  iconLogo:{
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 15,
  },
  input:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    flex: 1
  },
  headerBelow:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  body:{
    paddingHorizontal: 20,
  },
  categoryContainer:{
    marginTop: 20
  },
  popularContainer:{
    marginTop: 20
  },
  categoryItem:{
    padding: 10
  }
})

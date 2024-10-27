import {View, Text, Image, StyleSheet} from "react-native"

export default Footer = ()=>{
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image style={styles.icon} source={require("../assets/homeicon.png")}/>
        <Text>Home</Text>
      </View>
      <View style={styles.item}>
        <Image source={require("../assets/exploreicon.png")} style={styles.icon}/>
        <Text>Explore</Text>
      </View>
      <View style={styles.item}>
        <Image source={require("../assets/searchicon.png")} style={styles.icon}/>
        <Text>Search</Text>
      </View>
      <View style={styles.item}>
        <Image source={require("../assets/profileicon.png")} style={styles.icon}/>
        <Text>Profile</Text>
      </View>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#5958b2',
    
  },
  item:{
    alignItems: "center",justifyContent: "center",
    width: 50,
    height: 50
  },
  icon:{
    width:50,
    height: 50
  }
});
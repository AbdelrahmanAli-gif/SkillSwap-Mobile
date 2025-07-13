import React from 'react';
import { Text } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';

const Review = ({name,job,content,img}) => {
    return (
        <View style={{width:160,height:250 ,marginLeft:15}}>
         <Image style={{width:"100%",height:"60%",borderRadius:10}}  source={require(`../assets/u1.png`)}></Image>
         <View style={{width:"100%",alignItems:"center"}}>
         <Text style={{fontWeight:"600"}}>"{content}"</Text>
         </View>
         <View style={{width:"90%"}}>
         <Text className="text-gray-400">{name},{job}</Text>
         </View>

        </View>
    );
}

const styles = StyleSheet.create({})

export default Review;

import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Messages from '../components/Messages';


const MessagesScreen = () => {
    const[isClicked,setIsClicked]=useState("All")
    const msgs=[{
        id:"1",
        userName:"sophia",
        img:"u1",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Status:"All",
        Time:"3d"
    },
    {
        id:"2",
        userName:"sophia",
        img:"u1",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Status:"All",
        Time:"3d"
    },
    {
        id:"3",
        userName:"sophia",
        img:"u1",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Status:"Unread",
        Time:"3d"
    },{
        id:"4",
        userName:"sophia",
        img:"u1",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Status:"All",
        Time:"3d"
    },{
        id:"5",
        userName:"sophia",
        img:"u1",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Status:"All",
        Time:"3d"
    }]
    return (
        <View className="flex-1">
            <View className="ml-3">
                <Text className="font-bold text-3xl">Messages</Text>
            </View>
           <View className="w-9/12 m-3">
            <Text className="font-light text-gray-700">Communicate with potential matches , discuss details of the skill exchange , and schedule sessions </Text>
           </View>
           <View className="w-full m-2 h-12 flex-row border-b-[1px] border-b-slate-500">
            <TouchableOpacity onPress={()=>{
                setIsClicked("All")
            }} className={isClicked=="All"? "ml-4 mr-6 h-full items-center justify-center border-b-[2px]" :"ml-4 mr-6 h-full items-center justify-center" }> 
                <Text className="font-bold text-lg">All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                setIsClicked("Unread")
            }} className={isClicked=="Unread"?" ml-4 mr-6 h-full items-center justify-center border-b-[2px]":"ml-4 mr-6 h-full items-center justify-center "}>
                <Text className="font-bold text-lg">Unread</Text>
            </TouchableOpacity>
           </View>
           {
            isClicked=="All" ? (<ScrollView className="flex-1">
            {
                msgs.map((m)=>{
                    return <Messages key={m.id} userName={m.userName} img={m.img} content={m.content} time={m.Time}></Messages>
                })
            }
           </ScrollView>):(
            <ScrollView className="flex-1">
            {
                msgs.map((m)=>{
                    if(m.Status=="Unread"){
                        return <Messages key={m.id} userName={m.userName} img={m.img} content={m.content} time={m.Time}></Messages>
                    }
                    else{
                        return
                    }
                   
                })
            }
           </ScrollView>
           )
           }
         
        </View>
    );
}

const styles = StyleSheet.create({})

export default MessagesScreen;

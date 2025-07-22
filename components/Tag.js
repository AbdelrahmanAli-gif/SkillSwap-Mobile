import { View, Text, Pressable } from "react-native"
import React from "react"

export default function Tag({ children, onPressFunc }) {
  return (
    <Pressable onPress={onPressFunc} className=' bg-[#E8EDF5] p-4 py-2 rounded-lg'>
      <Text className="flex justify-center items-center text-center capitalize">
        {children}
      </Text>
    </Pressable>
  )
}

import { Text, Pressable } from "react-native"

export default function Tag({ children, onPressFunc = () => { }, teaching = false }) {
  return (
    <Pressable onPress={onPressFunc} className={`${teaching ? `bg-skill-teach-bg` : `bg-skill-learn-bg`} p-4 py-2 rounded-lg`}>
      <Text className="flex justify-center items-center text-center capitalize">
        {children}
      </Text>
    </Pressable>
  )
}

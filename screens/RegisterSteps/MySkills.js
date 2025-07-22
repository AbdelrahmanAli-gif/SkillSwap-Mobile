import { View, Text } from "react-native"
import SearchInput from "../../components/SearchInput"
import { useState } from "react"

export default function MySkills() {
  const [skillsToLearnInput, setSkillsToLearnInput] = useState("")
  const [skillsToTeachInput, setSkillsToTeachInput] = useState("")

  function handleSearchForSkills() {}

  return (
    <View className="bg-[#F7FAFC] flex-1 p-6 relative">
      <Text className="font-medium text-2xl">Skills I want to learn</Text>
      <SearchInput
        placeholderText="Search for skills"
        searchFunction={handleSearchForSkills}
        inputState={skillsToLearnInput}
        setInputState={setSkillsToLearnInput}
      ></SearchInput>

      <Text className="font-medium text-2xl mt-12">Skills I want to teach</Text>
      <SearchInput
        placeholderText="Search for skills"
        searchFunction={handleSearchForSkills}
        inputState={skillsToTeachInput}
        setInputState={setSkillsToTeachInput}
      ></SearchInput>
    </View>
  )
}

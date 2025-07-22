import { View, Text, FlatList, Pressable } from "react-native"
import SearchInput from "../../components/SearchInput"
import { useEffect, useState } from "react"
import { filterSkillPrompt } from "../../helpers/prompts"
import { generateFromGemini } from "../../api/gemini"
import { fetchSkillsList } from "../../utils/skillsCollections"

export default function MySkills() {
  const [skillsToLearnInput, setSkillsToLearnInput] = useState("")
  const [skillsToTeachInput, setSkillsToTeachInput] = useState("")
  const [skillsList, setSkillsList] = useState([])
  const [skillsToLearnSearchQuery, setSkillsToLearnSearchQuery] = useState("")
  const [skillsToTeachSearchQuery, setSkillsToTeachSearchQuery] = useState("")
  const [filteredSkills, setFilteredSkills] = useState([])
  const [selectedSkillToLearn, setSelectedSkillToLearn] = useState([])
  const [selectedSkillToTeach, setSelectedSkillToTeach] = useState([])
  const [newTeachSkills, setNewTeachSkills] = useState([])
  const [newLearnSkills, setNewLearnSkills] = useState([])

  useEffect(() => {
    const getSkills = async () => {
      const skillsArray = await fetchSkillsList()
      setSkillsList(skillsArray)
    }

    getSkills()
  }, [])

  useEffect(() => {
    const query = skillsToLearnInput
    setTimeout(() => {
      setSkillsToLearnSearchQuery(query)
    }, 1000)
  }, [skillsToLearnInput])

  useEffect(() => {
    setFilteredSkills([])
    if (skillsToLearnSearchQuery === skillsToLearnInput && skillsToLearnInput.trim() !== "") {
      const prompt = filterSkillPrompt(skillsToLearnInput.toLowerCase(), JSON.stringify(skillsList))
      console.log("Prompt for Gemini:", prompt)
      generateFromGemini(prompt).then((res) => {
        console.log(res)
        const parsedRes = JSON.parse(res)
        parsedRes.forEach((id) => {
          const skill = skillsList.find((skill) => skill.id === id)
          if (skill && !filteredSkills.includes(skill) && !selectedSkillToLearn.includes(skill)) {
            setFilteredSkills((prev) => [...prev, skill])
          }
        })
      })
    }
  }, [skillsToLearnSearchQuery])

  useEffect(() => {
    const query = skillsToTeachInput
    setTimeout(() => {
      setSkillsToTeachSearchQuery(query)
    }, 1000)
  }, [skillsToTeachInput])

  useEffect(() => {
    setFilteredSkills([])
    if (skillsToTeachSearchQuery === skillsToTeachInput && skillsToTeachInput.trim() !== "") {
      const prompt = filterSkillPrompt(skillsToTeachInput.toLowerCase(), JSON.stringify(skillsList))
      generateFromGemini(prompt).then((res) => {
        console.log(res)
        const parsedRes = JSON.parse(res)
        parsedRes.forEach((id) => {
          const skill = skillsList.find((skill) => skill.id === id)
          if (skill && !filteredSkills.includes(skill) && !selectedSkillToTeach.includes(skill)) {
            setFilteredSkills((prev) => [...prev, skill])
          }
        })
      })
    }
  }, [skillsToTeachSearchQuery])

  useEffect(() => {
    console.log("Filtered Skills Updated:", filteredSkills)
  }, [filteredSkills])

  function handleSearchForSkillsToLearn() {
    if (skillsToLearnInput.trim() !== "") {
      if (
        !skillsList.find((skill) => skill.skillName === skillsToLearnInput.trim()) &&
        !newLearnSkills.includes(skillsToLearnInput.trim())
      ) {
        setNewLearnSkills((prev) => [...prev, skillsToLearnInput.trim()])
        setSkillsToLearnInput("")
      }
    }
  }

  function handleSearchForSkillsToTeach() {
    if (skillsToTeachInput.trim() !== "") {
      if (
        !skillsList.find((skill) => skill.skillName === skillsToTeachInput.trim()) &&
        !newTeachSkills.includes(skillsToTeachInput.trim())
      ) {
        setNewTeachSkills((prev) => [...prev, skillsToTeachInput.trim()])
        setSkillsToTeachInput("")
      }
    }
  }

  return (
    <View className="bg-[#F7FAFC] flex-1 p-6 relative">
      <Text className="font-medium text-2xl">Skills I want to learn</Text>
      <View>
        <SearchInput
          placeholderText="Search for skills"
          searchFunction={handleSearchForSkillsToLearn}
          inputState={skillsToLearnInput}
          setInputState={setSkillsToLearnInput}
        ></SearchInput>

        {skillsToLearnInput.trim() !== "" && (
          <FlatList
            className="absolute top-full left-0 w-full z-50 border border-gray-300 rounded-lg mt-2 bg-white"
            data={filteredSkills}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                className="bg-white p-4 rounded-lg border-b border-gray-200"
                onPress={() => {
                  setSelectedSkillToLearn((prev) => [...prev, item])
                  setFilteredSkills([])
                  setSkillsToLearnInput("")
                }}
              >
                <Text className="text-lg font-semibold text-black capitalize">
                  {item.skillName}
                </Text>
              </Pressable>
            )}
          ></FlatList>
        )}
      </View>

      <Text className="font-medium text-2xl mt-12">Skills I want to teach</Text>
      <View>
        <SearchInput
          placeholderText="Search for skills"
          searchFunction={handleSearchForSkillsToTeach}
          inputState={skillsToTeachInput}
          setInputState={setSkillsToTeachInput}
        ></SearchInput>

        {skillsToTeachInput.trim() !== "" && (
          <FlatList
            className="absolute top-full left-0 w-full z-50 border border-gray-300 rounded-lg mt-2 bg-white"
            data={filteredSkills}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                className="bg-white p-4 rounded-lg border-b border-gray-200"
                onPress={() => {
                  setSelectedSkillToTeach((prev) => [...prev, item])
                  setFilteredSkills([])
                  setSkillsToTeachInput("")
                }}
              >
                <Text className="text-lg font-semibold text-black capitalize">
                  {item.skillName}
                </Text>
              </Pressable>
            )}
          ></FlatList>
        )}
      </View>
    </View>
  )
}

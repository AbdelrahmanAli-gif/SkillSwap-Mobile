import { View, Text, FlatList, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { filterSkillPrompt } from "../../helpers/prompts"
import { generateFromGemini } from "../../api/gemini"
import { fetchSkillsList } from "../../utils/skillsCollections"
import SearchInput from "../../components/SearchInput"
import Tag from "../../components/Tag"

export default function MySkills({ info, setInfo, setIsStepValid }) {
  const [skillsToLearnInput, setSkillsToLearnInput] = useState("")
  const [skillsToTeachInput, setSkillsToTeachInput] = useState("")
  const [skillsList, setSkillsList] = useState([])
  const [skillsToLearnSearchQuery, setSkillsToLearnSearchQuery] = useState("")
  const [skillsToTeachSearchQuery, setSkillsToTeachSearchQuery] = useState("")
  const [filteredSkills, setFilteredSkills] = useState([])
  const [selectedSkillToLearn, setSelectedSkillToLearn] = useState(info.needSkills || [])
  const [selectedSkillToTeach, setSelectedSkillToTeach] = useState(info.hasSkills || [])
  const [newTeachSkills, setNewTeachSkills] = useState(info.newSkillsToTeach || [])
  const [newLearnSkills, setNewLearnSkills] = useState(info.newSkillsToLearn || [])

  useEffect(() => {
    const isValid =
      (selectedSkillToLearn.length > 0) ||
      (selectedSkillToTeach.length > 0) ||
      (newTeachSkills.length > 0) ||
      (newLearnSkills.length > 0);

    setIsStepValid(isValid);
  }, [info]);

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
    }, 300)
  }, [skillsToLearnInput])

  useEffect(() => {
    setFilteredSkills([])
    if (skillsToLearnSearchQuery === skillsToLearnInput && skillsToLearnInput.trim() !== "") {
      const prompt = filterSkillPrompt(skillsToLearnInput.toLowerCase(), JSON.stringify(skillsList))
      generateFromGemini(prompt).then((res) => {
        const parsedRes = JSON.parse(res.replace("```json", "").replace("```", ""))
        parsedRes.forEach((id) => {
          const skill = skillsList.find((skill) => skill.skillId === id)
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
    }, 300)
  }, [skillsToTeachInput])

  useEffect(() => {
    setFilteredSkills([])
    if (skillsToTeachSearchQuery === skillsToTeachInput && skillsToTeachInput.trim() !== "") {
      const prompt = filterSkillPrompt(skillsToTeachInput.toLowerCase(), JSON.stringify(skillsList))
      generateFromGemini(prompt).then((res) => {
        const parsedRes = JSON.parse(res.replace("```json", "").replace("```", ""))
        parsedRes.forEach((id) => {
          const skill = skillsList.find((skill) => skill.skillId === id)
          if (skill && !filteredSkills.includes(skill) && !selectedSkillToTeach.includes(skill)) {
            setFilteredSkills((prev) => [...prev, skill])
          }
        })
      })
    }
  }, [skillsToTeachSearchQuery])

  function handleSearchForSkillsToLearn() {
    if (skillsToLearnInput.trim() !== "") {
      if (
        !skillsList.find((skill) => skill.skillName === skillsToLearnInput.trim()) &&
        !newLearnSkills.includes(skillsToLearnInput.trim())
      ) {
        setNewLearnSkills((prev) => [...prev, { skillName: skillsToLearnInput.trim() }])
        setInfo((prev) => ({ ...prev, newSkillsToLearn: prev.newSkillsToLearn ? [...prev.newSkillsToLearn, { skillName: skillsToLearnInput.trim(), skillLevel: "beginner" }] : [{ skillName: skillsToLearnInput.trim(), skillLevel: "beginner" }] }))
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
        setNewTeachSkills((prev) => [...prev, { skillName: skillsToTeachInput.trim() }])
        setInfo((prev) => ({ ...prev, newSkillsToTeach: prev.newSkillsToTeach ? [...prev.newSkillsToTeach, { skillName: skillsToTeachInput.trim(), skillLevel: "beginner" }] : [{ skillName: skillsToTeachInput.trim(), skillLevel: "beginner" }] }))
        setSkillsToTeachInput("")
      }
    }
  }

  return (
    <View className="flex-1 p-6 relative">
      <Text className="font-medium text-xl text-main-color-light dark:text-main-color-dark">Skills I want to learn</Text>
      <View>
        <SearchInput
          placeholderText="Search for skills"
          searchFunction={handleSearchForSkillsToLearn}
          inputState={skillsToLearnInput}
          setInputState={setSkillsToLearnInput}
        />

        {skillsToLearnInput.trim() !== "" && (
          <FlatList
            className="absolute top-full left-0 w-full z-50 border border-gray-300 rounded-lg bg-white mt-2"
            data={filteredSkills}
            keyExtractor={(item) => item.skillId}
            renderItem={({ item }) => (
              <Pressable
                className="bg-white p-4 rounded-lg border-b border-gray-200"
                onPress={() => {
                  setSelectedSkillToLearn((prev) => [...prev, item])
                  setInfo((prev) => ({ ...prev, needSkills: prev.needSkills ? [...prev.needSkills, { skillId: item.skillId, skillName: item.skillName, skillLevel: "beginner", skillNameArabic: item.skillNameArabic }] : [{ skillId: item.skillId, skillName: item.skillName, skillLevel: "beginner", skillNameArabic: item.skillNameArabic }] }))
                  setFilteredSkills([])
                  setSkillsToLearnInput("")
                }}
              >
                <Text className="text-lg font-semibold text-black capitalize">
                  {item.skillName}
                </Text>
              </Pressable>
            )}
          />
        )}

        <FlatList
          className="mt-1 w-full"
          ItemSeparatorComponent={() => <View className="w-2"></View>}
          horizontal
          data={selectedSkillToLearn}
          keyExtractor={(item) => item.skillId}
          renderItem={({ item }) => (
            <Tag
              onPressFunc={() => {
                setSelectedSkillToLearn((prev) => prev.filter((s) => s.skillId !== item.skillId))
                setInfo((prev) => {
                  const newSkillsToLearn = prev.needSkills.filter((s) => s.skillId !== item.skillId)
                  return { ...prev, needSkills: newSkillsToLearn }
                })
              }}
            >
              {item.skillName}
            </Tag>
          )}
        />

        <FlatList
          className="mt-1 w-full"
          ItemSeparatorComponent={() => <View className="w-2"></View>}
          horizontal
          data={newLearnSkills}
          keyExtractor={(item) => item.skillName}
          renderItem={({ item }) => (
            <Tag
              onPressFunc={() => {
                setNewLearnSkills((prev) => prev.filter((s) => s !== item))
                setInfo((prev) => {
                  const newSkillsToLearn = prev.newSkillsToLearn.filter((s) => s !== item)
                  return { ...prev, newSkillsToLearn }
                })
              }}
            >
              {item.skillName}
            </Tag>
          )}
        />
      </View>

      <Text className="font-medium text-xl mt-12 text-main-color-light dark:text-main-color-dark">Skills I want to teach</Text>
      <View>
        <SearchInput
          placeholderText="Search for skills"
          searchFunction={handleSearchForSkillsToTeach}
          inputState={skillsToTeachInput}
          setInputState={setSkillsToTeachInput}
        />

        {skillsToTeachInput.trim() !== "" && (
          <FlatList
            className="absolute top-full left-0 w-full z-50 border border-gray-300 rounded-lg mt-2 bg-white"
            data={filteredSkills}
            keyExtractor={(item) => item.skillId}
            renderItem={({ item }) => (
              <Pressable
                className="bg-white p-4 rounded-lg border-b border-gray-200"
                onPress={() => {
                  setSelectedSkillToTeach((prev) => [...prev, item])
                  setInfo((prev) => ({ ...prev, hasSkills: prev.hasSkills ? [...prev.hasSkills, { skillId: item.skillId, skillName: item.skillName, skillLevel: "beginner", skillNameArabic: item.skillNameArabic }] : [{ skillId: item.skillId, skillName: item.skillName, skillLevel: "beginner", skillNameArabic: item.skillNameArabic }] }))
                  setFilteredSkills([])
                  setSkillsToTeachInput("")
                }}
              >
                <Text className="text-lg font-semibold text-black capitalize">
                  {item.skillName}
                </Text>
              </Pressable>
            )}
          />
        )}

        <FlatList
          className="mt-1 w-full"
          ItemSeparatorComponent={() => <View className="w-2"></View>}
          horizontal
          data={selectedSkillToTeach}
          keyExtractor={(item) => item.skillId}
          renderItem={({ item }) => (
            <Tag
              teaching={true}
              onPressFunc={() => {
                setSelectedSkillToTeach((prev) => prev.filter((s) => s.skillId !== item.skillId))
                setInfo((prev) => {
                  const newSkillsToTeach = prev.hasSkills.filter((s) => s.skillId !== item.skillId)
                  return { ...prev, hasSkills: newSkillsToTeach }
                })
              }}
            >
              {item.skillName}
            </Tag>
          )}
        />

        <FlatList
          className="mt-1 w-full"
          ItemSeparatorComponent={() => <View className="w-2"></View>}
          horizontal
          data={newTeachSkills}
          keyExtractor={(item) => item.skillName}
          renderItem={({ item }) => (
            <Tag
              teaching={true}
              onPressFunc={() => {
                setNewTeachSkills((prev) => prev.filter((s) => s !== item))
                setInfo((prev) => {
                  const newSkillsToTeach = prev.newSkillsToTeach.filter((s) => s !== item)
                  return { ...prev, newSkillsToTeach }
                })
              }}
            >
              {item.skillName}
            </Tag>
          )}
        />
      </View>
    </View>
  )
}
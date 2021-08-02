import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Platform,
  FlatList
} from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);
  const [greetings, setGreetings] = useState('');

  function handleAddNewSkill() {
    if (newSkill.trim()) {
      setMySkills(oldState => [...oldState, newSkill]);
      setNewSkill('');
    }
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) setGreetings('Good Morning 🌞')
    if (currentHour >= 12 && currentHour < 18) setGreetings('Good afternoon 🌥')
    if (currentHour >= 17) setGreetings('Good evening 🌚')
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Daniel</Text>
      <Text style={styles.greetings}>{greetings}</Text>
      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />
      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      <FlatList 
        data={mySkills}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({ item }) => <SkillCard skill={item} />}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingTop: 70,
    paddingBottom: 10,
    paddingHorizontal: 30
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#fff'
  }
});

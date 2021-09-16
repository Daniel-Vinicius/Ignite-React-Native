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

interface Skill {
  id: string;
  name: string;
};

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [greetings, setGreetings] = useState('');
  const newSkillIsEmpty = Boolean(!newSkill.trim());

  function handleAddNewSkill() {
    if (!newSkillIsEmpty) {
      const data = {
        id: String(new Date().getTime()),
        name: newSkill,
      };

      setMySkills(oldState => [...oldState, data]);
      setNewSkill('');
    }
  }

  function handleRemoveSkill(idSkill: string) {
    setMySkills(oldSkills => oldSkills.filter(skill => skill.id !== idSkill));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) setGreetings('Good Morning 🌞')
    if (currentHour >= 12 && currentHour < 18) setGreetings('Good afternoon 🌥')
    if (currentHour >= 17) setGreetings('Good evening 🌚')
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="welcome">Welcome, Daniel</Text>
      <Text style={styles.greetings}>{greetings}</Text>
      <TextInput
        testID="input-new"
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button
        testID="button-add"
        onPress={handleAddNewSkill}
        title="Add"
        disabled={Boolean(!newSkill.trim())}
        styleAdditional={newSkillIsEmpty && { backgroundColor: '#8e69ca9d' }}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      <FlatList
        testID="flat-list-skills"
        data={mySkills}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="never"
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onLongPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
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

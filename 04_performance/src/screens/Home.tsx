import React, { useState } from 'react';

import { FriendList } from '../components/FriendList';

import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.2.169:3333/friends?q=${name}`);
    const friendsData = await response.json();
    setFriends(friendsData);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>

      <TextInput
        placeholder="Nome do cliente"
        onChangeText={setName}
        style={styles.input}
      />

      <Button
        title="Buscar"
        onPress={handleSearch}
      />

      <ScrollView style={styles.list}>
        <FriendList data={friends} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginBottom: 10
  },
  list: {
    marginTop: 20
  }
});

import React from 'react';

import { View } from 'react-native';

import { Friend } from './Friend';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
}

export function FriendList({ data }: Props) {
  return (
    <View>
      {data.map(friend => (
        <Friend key={String(friend.id)} data={friend} />
      ))}
    </View>
  );
};

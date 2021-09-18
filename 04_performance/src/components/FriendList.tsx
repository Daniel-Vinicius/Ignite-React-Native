import React, { useMemo } from 'react';

import { View, Text, FlatList } from 'react-native';

import { Friend } from './Friend';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
  follow: () => void;
}

export function FriendList({ data, follow }: Props) {
  // if data not changed totalLikes not will be recalculated thanks to useMemo
  const totalLikesMemoized = useMemo(() => {
    return data.reduce((acc, friend) => acc + friend.likes, 0);
  }, [data]);

  return (
    <View style={{ marginTop: 20 }}>
      <Text>Total de likes: {totalLikesMemoized}</Text>

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        style={{ marginBottom: 150 }}
        renderItem={({ item: friend }) => (
          <Friend
            key={String(friend.id)}
            data={friend}
            follow={follow}
          />
        )}
      />
    </View>
  );
};

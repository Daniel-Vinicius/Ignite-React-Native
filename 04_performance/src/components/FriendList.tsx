import React, { useMemo } from 'react';

import { View, Text } from 'react-native';

import { Friend } from './Friend';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
}

export function FriendList({ data }: Props) {
  // if data not changed totalLikes not will be recalculated thanks to useMemo
  const totalLikesMemoized = useMemo(() => {
    return data.reduce((acc, friend) => acc + friend.likes, 0);
  }, [data]);

  return (
    <View>
      <Text>Total de likes: {totalLikesMemoized}</Text>

      {data.map(friend => (
        <Friend key={String(friend.id)} data={friend} />
      ))}
    </View>
  );
};

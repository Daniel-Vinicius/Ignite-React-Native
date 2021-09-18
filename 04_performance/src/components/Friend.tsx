import React, { memo } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import lodash from 'lodash';

interface Props {
  data: {
    name: string;
    likes: number;
  },
  follow: () => void;
}

function FriendComponent({ data, follow }: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>
        {data.name} - Likes: {data.likes}
      </Text>

      <TouchableOpacity onPress={follow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Friend = memo(FriendComponent, ((prevProps, nextProps) => {
  // if propsAreEqual dont'n recalcule this component
  const propsAreEqual = lodash.isEqual(prevProps.data, nextProps.data);
  return propsAreEqual;
}));

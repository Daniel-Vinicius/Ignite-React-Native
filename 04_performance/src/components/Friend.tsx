import React from 'react';

import { Text } from 'react-native';

 interface Props {
   data: {
     name: string;
     likes: number;
   }
 }

export function Friend({ data }: Props) {
  return (
    <Text>
      { data.name } - Likes: { data.likes }
    </Text>
  );
};

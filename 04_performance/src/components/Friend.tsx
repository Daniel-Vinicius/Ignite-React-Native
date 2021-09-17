import React, { memo } from 'react';

import { Text } from 'react-native';

 interface Props {
   data: {
     name: string;
     likes: number;
   }
 }

function FriendComponent({ data }: Props) {
  return (
    <Text>
      { data.name } - Likes: { data.likes }
    </Text>
  );
};

// export const Friend = memo(FriendComponent, ((prevProps, nextProps) => {
//   const namePropNotChanged = prevProps.data.name === nextProps.data.name;
//   const likesPropNotChanged = prevProps.data.likes === nextProps.data.likes;

//   if (namePropNotChanged && likesPropNotChanged) {
//     return true
//   }

//   return false;
// }));

export const Friend = memo(FriendComponent, ((prevProps, nextProps) => {
  // if propsAreEqual dont'n recalcule this component
  const propsAreEqual = Object.is(prevProps.data, nextProps.data);
  return propsAreEqual;
}));

import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 8px;
  padding: 16px;
`;

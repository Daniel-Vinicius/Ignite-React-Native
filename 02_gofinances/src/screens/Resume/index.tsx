import React from 'react';

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title
} from './styles';

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard title="Salário" amount="R$ 100,00" color="#235bc2" />
    </Container>
  );
};

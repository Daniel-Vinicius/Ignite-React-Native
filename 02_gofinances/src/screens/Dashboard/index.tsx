import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, ITransactionCard } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from './styles';

export interface DataListProps extends ITransactionCard {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  outputs: HighlightProps;
  total: HighlightProps;
}

function formatToBRL(number: number): string {
  const formatted = number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return formatted;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  
  const theme = useTheme();
  const collectionKeyTransactions = '@gofinances:transactions';

  async function loadTransactions() {
    const transactionsStringified = await AsyncStorage.getItem(collectionKeyTransactions);
    const transactionsParsed = transactionsStringified ? JSON.parse(transactionsStringified) : [];

    let entriesTotal = 0;
    let outputsTotal = 0;

    const transactionsFormatted: DataListProps[] = transactionsParsed.map((item: DataListProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      }

      if (item.type === 'negative') {
        outputsTotal += Number(item.amount);
      }

      const amount = formatToBRL(Number(item.amount));

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      };
    });

    
    const total = entriesTotal - outputsTotal;
    
    setHighlightData({
      entries: { amount: formatToBRL(entriesTotal) },
      outputs: { amount: formatToBRL(outputsTotal) },
      total: { amount: formatToBRL(total) }
    });

    setTransactions(transactionsFormatted);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [])
  )

  return (
    <Container>
      { isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large" />
        </LoadContainer>
      ) :
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{ uri: 'https://avatars.githubusercontent.com/u/66279500?v=4' }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>Daniel</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction="Última entrada dia 13 de abril"
            />

            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.outputs.amount}
              lastTransaction="Última saída dia 03 de abril"
            />

            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction="01 à 16 de abril"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} /> }
            />

          </Transactions>
        </>
      }
    </Container>
  );
};

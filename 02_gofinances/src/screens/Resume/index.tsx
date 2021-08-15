import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';

import { DataListProps } from '../Dashboard';

import { collectionKeyTransactions } from '../../utils/collectionKeyTransactions';
import { categories } from '../../utils/categories';
import { formatToBRL } from '../../utils/formatToBRL';

import {
  Container,
  Header,
  Title,
  Content,
} from './styles';

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem(collectionKeyTransactions);
    const transactionsParsed = response ? JSON.parse(response) as DataListProps[] : [];

    const outputs = transactionsParsed.filter(transaction => transaction.type === 'negative');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      outputs.forEach(output => {
        if (output.category === category.key) {
          categorySum += Number(output.amount);
        }
      })

      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: formatToBRL(categorySum),
          color: category.color,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.map(category => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
};

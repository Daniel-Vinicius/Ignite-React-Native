import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

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
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  Month,
  MonthSelectIcon,
} from './styles';

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem(collectionKeyTransactions);
    const transactionsParsed = response ? JSON.parse(response) as DataListProps[] : [];

    const outputs = transactionsParsed.filter(transaction => transaction.type === 'negative');

    const outputsTotal = outputs.reduce((accumulator, output) => {
      return accumulator + Number(output.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      outputs.forEach(output => {
        if (output.category === category.key) {
          categorySum += Number(output.amount);
        }
      })

      if (categorySum > 0) {
        const percent = `${(categorySum / outputsTotal * 100).toFixed(1)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: formatToBRL(categorySum),
          color: category.color,
          percent,
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

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: useBottomTabBarHeight() }}
      >
        <MonthSelect>
          <MonthSelectButton>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>Maio</Month>

          <MonthSelectButton>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            x="percent"
            y="total"
            labelRadius={50}
            style={{
              labels: {
                fontSize: `${RFValue(18)}px`,
                fontFamily: theme.fonts.regular,
                fill: theme.colors.shape
              }
            }}
          />
        </ChartContainer>

        {totalByCategories.map(category => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.totalFormatted}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
};

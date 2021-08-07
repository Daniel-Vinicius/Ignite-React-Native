import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface Category {
  name: string;
  icon: string;
}

export interface ITransactionCard {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface TransactionCardProps {
  data: ITransactionCard;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { type, title, amount, category, date } = data;

  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>{type === 'negative' ? '- ' + amount : amount}</Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container> 
  );
};

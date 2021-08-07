import { DataListProps } from "../screens/Dashboard";

export const transactions: DataListProps[] = [
  {
    id: '1',
    type: 'positive',
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: { name: "Vendas", icon: "dollar-sign" },
    date: "13/04/2020"
  },
  {
    id: '2',
    type: 'negative',
    title: "Hamburgueria Pizzy",
    amount: "R$ 59,00",
    category: { name: "Alimentação", icon: "coffee" },
    date: "10/04/2020"
  },
  {
    id: '3',
    type: 'negative',
    title: "Aluguel do apartamento",
    amount: "R$ 1.200,00",
    category: { name: "Casa", icon: "home" },
    date: "27/03/2020"
  },
];

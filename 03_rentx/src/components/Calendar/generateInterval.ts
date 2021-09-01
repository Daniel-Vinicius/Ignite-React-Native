import { addDays, eachDayOfInterval, format } from "date-fns";

import { MarkedDateProps, DayProps } from ".";
import theme from "../../styles/theme";

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp)
  }).forEach((item) => {
    const correctDate = addDays(item, 1);
    const date = format(correctDate, 'yyyy-MM-dd');

    const color = start.dateString === date || end.dateString === date
    ? theme.colors.main : theme.colors.main_light;

    const textColor = start.dateString === date || end.dateString === date
    ? theme.colors.main_light : theme.colors.main;

    interval = {
      ...interval,
      [date]: {
        color,
        textColor,
      }
    };
  });

  return interval;
};

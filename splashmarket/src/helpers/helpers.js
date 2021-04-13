import moment from 'moment';

export const getLocalTime = () => {
  const localTime = moment.utc().local().format('HH');
  let greeting = 'Morning';
  const afternoon = 12; // 24hr time to split the afternoon
  const evening = 17; // 24hr time to split the evening
  if (localTime >= evening) {
    greeting = 'Evening';
  } else if (localTime >= afternoon && localTime <= evening) {
    greeting = 'Afternoon';
  }
  return `Good ${greeting}`;
};

export const placeholder = () => {};

export const getCurrentDate = () => {
  const currentDate = new Date().toLocaleDateString('en-UK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return currentDate;
};

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getToday = () => {
  const now = new Date();
  const padNum = (input: number) => input.toString().padStart(2, '0');
  const nowString = `${now.getFullYear()}-${padNum(
    now.getMonth() + 1
  )}-${padNum(now.getDate())}`;

  return nowString;
};

type OpeningHours = {
  day: number,
  time: string
}

type OpeningDays = {
  open: OpeningHours,
  close: OpeningHours
}

const formatTimeNumber = (n: number): string => n.toString().padStart(2, '0');
const getHours = (time: string): number => Number(time.slice(0, 2));
const getMinutes = (time: string):number => Number(time.slice(-2));

const getOpenStatus = ({ openHours, openMinutes, closeHours, closeMinutes }): boolean => {
  const currentTime = new Date().getTime();
  const openTime = new Date().setHours(openHours, openMinutes);
  const closeTime = new Date().setHours(closeHours, closeMinutes);
  return currentTime >= openTime && currentTime <= closeTime;
}

export default function getOpeningHoursFormatted(opening_hours: OpeningDays[]): string {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const day = opening_hours.find(item => item.open.day === currentDay);

  if (!day)
    return 'Closed';

  const openFromMidnight = day.open.time === '0000';
  const openTillMidnight = !day.close || day.close.time === '2359';

  if(openFromMidnight && openTillMidnight)
    return '24h';

  const openHours = getHours(day.open.time);
  const openMinutes = getMinutes(day.open.time);
  const closeHours = getHours(day.close.time);
  const closeMinutes = getMinutes(day.close.time);
  const openStatus = getOpenStatus({ openHours, openMinutes, closeHours, closeMinutes }) ? 'Open' : 'Closed';

  return `${formatTimeNumber(openHours)}:${formatTimeNumber(openMinutes)} - ${formatTimeNumber(closeHours)}:${formatTimeNumber(closeMinutes)} (${openStatus})`;
}

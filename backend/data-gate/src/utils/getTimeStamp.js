export const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  const timezoneOffset = -date.getTimezoneOffset() / 60; // Convert minutes to hours

  const timezone = (timezoneOffset >= 0 ? '+' : '-') + String(Math.abs(timezoneOffset)).padStart(2, '0') + ':00';

  const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezone}`;
  return timestamp;
}

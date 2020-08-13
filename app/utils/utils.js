export const getDifferTime = (startTime, endTime) => {
  let intervalTime = endTime - startTime;
  let daySec = 24 * 60 * 60 * 1000;
  let hourSec = 60 * 60 * 1000;
  let minSec = 60 * 1000;
  let days = Math.floor(intervalTime / daySec);
  let hours = Math.floor((intervalTime % daySec) / hourSec);
  let minutes = Math.floor(((intervalTime % daySec) % hourSec) / minSec);
  if (days > 0 && hours > 0) return `${days}天${hours}小时`;
  if (days > 0) return `${days}天`;
  if (hours > 0 && minutes > 0) return `${hours}小时${minutes}分钟`;
  return `${minutes}分钟`;
}
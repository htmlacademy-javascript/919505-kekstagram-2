const convertTimeToMinutes = (time) => {
  const [hour, minute] = time.split(':');

  const normalisedHour = +hour;
  const normalisedMinute = +minute;

  return normalisedHour * 60 + normalisedMinute;
};

const isMeetingValid = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const start = convertTimeToMinutes(dayStart);
  const end = convertTimeToMinutes(dayEnd);
  const meeting = convertTimeToMinutes(meetingStart) + meetingDuration;

  // eslint-disable-next-line no-console
  console.log(start <= meeting && meeting <= end);
};

isMeetingValid('08:00', '17:30', '14:00', 90); // true
isMeetingValid('8:0', '10:0', '8:0', 120); // true
isMeetingValid('08:00', '14:30', '14:00', 90); // false
isMeetingValid('14:00', '17:30', '08:0', 90); // false
isMeetingValid('8:00', '17:30', '08:00', 900); // false

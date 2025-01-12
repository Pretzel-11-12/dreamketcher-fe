import moment from 'moment';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import { useEffect, useState } from 'react';

type DateTimeSelectorProps = {
  onChange: (value: string) => void;
};
const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ onChange }) => {
  const [time, setTime] = useState('09:00');
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

  const onChangeDate = (value: string) => {
    setDate(value);
  };

  const onChangeTime = (value: string) => {
    setTime(value);
  };

  useEffect(() => {
    const combinedDateTime = `${date}T${time}`;
    onChange(combinedDateTime);
  }, [date, time]);

  return (
    <div className="flex gap-2">
      <DateSelector onChange={onChangeDate} />
      <TimeSelector onChange={onChangeTime} />
    </div>
  );
};

export default DateTimeSelector;

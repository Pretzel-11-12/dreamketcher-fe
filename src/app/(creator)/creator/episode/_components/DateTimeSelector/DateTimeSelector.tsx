import moment from 'moment';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import { useEffect, useState } from 'react';

type DateTimeSelectorProps = {
  onChange: (value: string) => void;
};
const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ onChange }) => {
  const [time, setTime] = useState(new Date().getHours() + 1);
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  const [dateVisible, setDateVisible] = useState<boolean>(true);

  const onChangeDate = (value: string) => {
    setDate(value);
    setTimeVisible(true);
  };

  const onChangeTime = (value: number) => {
    setTime(value);
    setTimeVisible(false);
  };

  useEffect(() => {
    const combinedDateTime = `${date}T${String(time).padStart(2, '0') + ':00'}`;
    onChange(combinedDateTime);
  }, [date, time]);

  return (
    <div className="flex gap-2 relative h-[37px]">
      <DateSelector
        onChange={onChangeDate}
        visible={dateVisible}
        setVisible={setDateVisible}
      />
      <TimeSelector
        date={date}
        time={time}
        onChange={onChangeTime}
        visible={timeVisible}
        setVisible={setTimeVisible}
      />
    </div>
  );
};

export default DateTimeSelector;

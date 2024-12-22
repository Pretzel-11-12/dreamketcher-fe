import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateSelector: React.FC<{}> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<Value>(new Date());

  const onChangeCalendar = (value: Value) => {
    setValue(value);
    setVisible(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setVisible(!visible)}
        className="text-sm bg-white border border-brand-yellow rounded-md p-2 flex justify-center font-normal cursor-pointer w-[180px]"
      >
        <span>
          {value ? new Date(String(value)).toLocaleDateString() : '-'}
        </span>
      </div>
      {visible && (
        <Calendar
          onChange={onChangeCalendar}
          value={value}
          className="bg-white rounded-md border border-brand-yellow p-4 text-sm w-[300px] h-[300px] absolute top-12"
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => `${date.getDate()}`}
        />
      )}
    </div>
  );
};

export default DateSelector;

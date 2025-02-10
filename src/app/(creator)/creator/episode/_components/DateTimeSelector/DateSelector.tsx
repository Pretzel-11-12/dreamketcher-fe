import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import moment from 'moment';

type DateSelectorType = {
  onChange: (value: string) => void;
  setVisible: (value: boolean) => void;
  visible: boolean;
};

const DateSelector: React.FC<DateSelectorType> = ({
  onChange,
  setVisible,
  visible,
}) => {
  const [value, setValue] = useState<Date>(new Date());

  const onChangeCalendar = (value: any) => {
    setValue(value);
    onChange(moment(value).format('YYYY-MM-DD'));
    setVisible(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setVisible(!visible)}
        className={`text-sm bg-white border ${
          visible ? 'border-brand-yellow' : 'border-brand-gray'
        } rounded-md p-2 flex justify-center font-normal cursor-pointer w-[194px]`}
      >
        <span>{value ? moment(value).format('YYYY-MM-DD') : '-'}</span>
      </div>
      {visible && (
        <Calendar
          onChange={onChangeCalendar}
          value={value}
          className="bg-white rounded-md border border-brand-yellow p-4 text-sm w-[324px] h-[300px] absolute top-12"
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => `${date.getDate()}`}
          tileDisabled={({ date }) =>
            date < new Date(new Date().setHours(0, 0, 0, 0))
          }
        />
      )}
    </div>
  );
};

export default DateSelector;

import _ from 'lodash';
import { useState } from 'react';

type TimeSelectorType = {
  onChange: (value: string) => void;
};

const TimeSelector: React.FC<TimeSelectorType> = ({ onChange }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('09:00');

  const times = _.range(0, 24).map(
    (hour) => hour.toString().padStart(2, '0') + ':00'
  );

  const onChangeTime = (value: string) => {
    setValue(value);
    onChange(value);
    setVisible(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setVisible(!visible)}
        className="text-sm bg-white border border-brand-yellow rounded-md w-[140px] h-full flex justify-center font-normal cursor-pointer items-center"
      >
        <span>{value}</span>
      </div>
      {visible && (
        <div className="flex flex-col h-[250px] w-[200px] overflow-scroll border rounded-md absolute top-12 text-sm py-1 bg-white">
          {times.map((time) => (
            <div
              className="border-b py-2 cursor-pointer hover:bg-brand-gray px-3"
              onClick={() => onChangeTime(time)}
            >
              <span
                className={`${
                  time === value ? 'text-brand-yellow' : 'text-slate-700'
                }`}
              >
                {time}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSelector;

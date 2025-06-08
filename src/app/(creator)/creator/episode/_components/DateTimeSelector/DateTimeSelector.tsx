import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import Icon from '/public/assets/icon/radioButton.svg';
import _ from 'lodash';
import Button from '@/app/_component/Button';
import Image from 'next/image';

type DateTimeSelectorProps = {
  onChange: (value: string) => void;
};
const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ onChange }) => {
  const [time, setTime] = useState(new Date().getHours() + 1);
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [value, setValue] = useState<Date>(new Date());
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const [isTimeSelected, setIsTimeSelected] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const onChangeCalendar = (value: any) => {
    setDate(value);
    onChange(moment(value).format('YYYY-MM-DD'));
    setDateVisible(false);
    setIsDateSelected(true);
    if (!isTimeSelected) {
      setTimeVisible(true);
    }
  };

  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  const [dateVisible, setDateVisible] = useState<boolean>(true);

  const onChangeDate = (value: string) => {
    setDate(value);
    setTimeVisible(true);
  };

  const onChangeTime = (value: number) => {
    setTime(value);
    setTimeVisible(false);
    setIsTimeSelected(true);
    if (!isDateSelected) {
      setDateVisible(true);
    }
  };

  useEffect(() => {
    const combinedDateTime = `${date}T${String(time).padStart(2, '0') + ':00'}`;
    onChange(combinedDateTime);
  }, [date, time]);

  const times = _.range(0, 24)
    .filter((v) => {
      const _date = new Date(new Date(date).setHours(0, 0, 0, 0));
      const now = new Date(new Date().setHours(0, 0, 0, 0));

      return _date > now ? v : v >= new Date().getHours() + 1;
    })
    .map((hour) => {
      return {
        id: hour,
        text: formatterTime(hour),
      };
    });
  function formatterTime(hour: number) {
    return moment(hour, 'HH:mm')
      .format('A hh:mm')
      .replace('AM', '오전')
      .replace('PM', '오후');
  }

  return (
    <div>
      <div className="flex gap-2 relative">
        <div
          onClick={() => {
            setDateVisible(!dateVisible);
            setTimeVisible(false);
          }}
          className={`text-sm bg-white border ${
            dateVisible || isDateSelected
              ? 'border-brand-yellow'
              : 'border-brand-gray'
          } rounded-md p-2 flex justify-center font-normal cursor-pointer w-[194px]`}
        >
          <span>{date ? moment(date).format('YYYY-MM-DD') : '-'}</span>
        </div>
        <div
          onClick={() => {
            setTimeVisible(!timeVisible);
            setDateVisible(false);
          }}
          className={`text-sm bg-white border h-[37px] ${
            timeVisible || isTimeSelected
              ? 'border-brand-yellow'
              : 'border-brand-gray'
          } rounded-md w-[123px] flex justify-center font-normal cursor-pointer items-center`}
        >
          <span>{formatterTime(time)}</span>
        </div>
      </div>
      {dateVisible && (
        <Calendar
          onChange={onChangeCalendar}
          value={value}
          className="bg-white rounded-md border border-brand-yellow p-4 text-sm w-[324px] h-[300px] mt-[14px]"
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => `${date.getDate()}`}
          tileDisabled={({ date }) =>
            date < new Date(new Date().setHours(0, 0, 0, 0))
          }
        />
      )}
      {timeVisible && (
        <div className="flex flex-col h-[250px] w-[323px] overflow-y-scroll border rounded-md mt-[14px] text-sm py-2 bg-white px-2">
          {times.map((t) => (
            <div
              key={t.id}
              className={`border-b border-brand-gray py-3 cursor-pointer hover:bg-brand-gray px-4 flex items-center gap-2`}
              onClick={() => onChangeTime(t.id)}
            >
              <Icon
                className={
                  time === t.id ? `text-brand-yellow` : 'text-brand-gray'
                }
              />
              <span
                className={`${
                  time === t.id ? 'text-brand-yellow' : 'text-slate-700'
                }`}
              >
                {t.text}
              </span>
            </div>
          ))}
        </div>
      )}
      {isConfirm ? (
        <div className="flex gap-2 mt-[13px]">
          <Image
            src="/assets/icon/info-circle.svg"
            alt="check"
            width={15}
            height={15}
          />
          <span className="text-[12px] font-normal text-[#888888]">
            지정된 시간에 맞춰 작품이 습작처리됩니다.
          </span>
        </div>
      ) : (
        <Button
          props={{
            size: 'C',
            variant: 'brand-yellow',
            disabled: !isDateSelected || !isTimeSelected,
            containerStyles:
              'w-full mt-[14px] h-[40px] text-[15px] font-medium text-white disabled:bg-brand-gray',
            handleClick: () => {
              setIsConfirm(true);
            },
          }}
        >
          확인
        </Button>
      )}
    </div>
  );
};

export default DateTimeSelector;

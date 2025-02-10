import _ from 'lodash';
import Icon from '/public/assets/icon/radioButton.svg';
import moment from 'moment';

type TimeSelectorType = {
  onChange: (value: number) => void;
  setVisible: (value: boolean) => void;
  visible: boolean;
  time: number;
  date: string;
};

const TimeSelector: React.FC<TimeSelectorType> = ({
  onChange,
  setVisible,
  visible,
  time,
  date,
}) => {
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

  const onChangeTime = (value: number) => {
    onChange(value);
  };

  return (
    <>
      <div
        onClick={() => setVisible(!visible)}
        className={`text-sm bg-white border ${
          visible ? 'border-brand-yellow' : 'border-brand-gray'
        } rounded-md w-[123px] h-full flex justify-center font-normal cursor-pointer items-center`}
      >
        <span>{formatterTime(time)}</span>
      </div>
      {visible && (
        <div className="flex flex-col h-[250px] w-[323px] overflow-y-scroll border rounded-md absolute top-12 text-sm py-2 bg-white px-2">
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
    </>
  );
};

export default TimeSelector;

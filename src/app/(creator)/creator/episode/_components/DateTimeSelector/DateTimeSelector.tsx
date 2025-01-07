import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';

const DateTimeSelector: React.FC<{}> = () => {
  return (
    <div className="flex gap-2">
      <DateSelector />
      <TimeSelector />
    </div>
  );
};

export default DateTimeSelector;

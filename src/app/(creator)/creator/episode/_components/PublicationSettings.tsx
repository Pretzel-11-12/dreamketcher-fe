'use client';

import VerticalButtonGroup from '@/app/_component/VerticalButtonGroup';
import DateTimeSelector from './DateTimeSelector/DateTimeSelector';

interface PublicationSettingsProps {
  seriesStatus: 'ongoing' | 'completed';
  onSeriesStatusChange: (status: 'ongoing' | 'completed') => void;
  isScheduledEnabled: boolean;
  onScheduledToggle: () => void;
  onTimeChange: (time: string) => void;
}

const PublicationSettings: React.FC<PublicationSettingsProps> = ({
  seriesStatus,
  onSeriesStatusChange,
  isScheduledEnabled,
  onScheduledToggle,
  onTimeChange,
}) => {
  return (
    <div className="p-[14px] pr-[70px] rounded-[5px] border border-[#F2F2F2] min-w-[411px] w-fit">
      <VerticalButtonGroup
        options={[
          { id: 'ongoing', label: '연재' },
          { id: 'completed', label: '완결' },
        ]}
        selectedValue={seriesStatus}
        onChange={onSeriesStatusChange}
      />
      <hr className="my-4 border-[#F2F2F2]" />
      <div className="flex items-center gap-[10px]">
        <button
          onClick={onScheduledToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isScheduledEnabled ? 'bg-brand-yellow' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isScheduledEnabled ? 'translate-x-1' : 'translate-x-6'
            }`}
          />
        </button>
        <span className="text-[15px] font-medium text-[#3F3F3F]">
          습작 예약
        </span>
      </div>

      {isScheduledEnabled && (
        <div className="mt-[14px]">
          <DateTimeSelector onChange={onTimeChange} />
        </div>
      )}
    </div>
  );
};

export default PublicationSettings;

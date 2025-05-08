'use client';
import React, { useEffect, useState } from 'react';
import { Alarm, mockAlarmData } from '@/app/mocks/alarm';
import Pagination from '@/app/_component/Pagination';
import AlarmThumbnail from './AlarmThumbnail';
import AlarmMainSectionHeader from './AlarmMainSectionHeader';

export default function AlarmMainSection() {
  const [alarmData, setAlarmData] = useState<Alarm[]>([]);

  useEffect(() => {
    setAlarmData(mockAlarmData);
  }, []);

  // 모든 alarm의 isRead를 true로 설정하는 함수
  const markAllAsRead = () => {
    setAlarmData((prevData) =>
      prevData.map((alarm) => ({ ...alarm, isRead: true }))
    );
  };

  // alarmData를 빈 배열로 만드는 함수
  const clearAllAlarms = () => {
    setAlarmData([]);
  };

  // 개별 alarm의 isRead를 true로 설정하는 함수
  const markAsRead = (id: number) => {
    setAlarmData((prevData) =>
      prevData.map((alarm) =>
        alarm.id === id ? { ...alarm, isRead: true } : alarm
      )
    );
  };

  // 개별 alarm을 alarmData 배열에서 제거하는 함수
  const removeAlarm = (id: number) => {
    setAlarmData((prevData) => prevData.filter((alarm) => alarm.id !== id));
  };

  const isError = false;
  return (
    <div className="flex flex-col w-full max-w-[1200px] min-h-[calc(100vh-255px)] pt-[30px] pb-[100px]">
      <div className="flex flex-col gap-[15px]">
        {isError && (
          <div className="p-4 text-red-500 bg-red-50 rounded">
            검색 결과를 불러오는 중 오류가 발생했습니다. 잠시 후 다시
            시도해주세요.
          </div>
        )}
        <div className="flex items-end">
          <p className="text-[18px] font-medium leading-[21px] text-titleBlack">
            알람
          </p>
          <p className="ml-2 text-sm text-gray-500">총 {alarmData.length}개</p>
        </div>
        <div className="w-full mb-[12px] flex justify-between items-center">
          <AlarmMainSectionHeader
            markAllAsRead={markAllAsRead}
            clearAllAlarms={clearAllAlarms}
          />
        </div>
        <div className="flex flex-col mb-[10px] min-h-[calc(100vh-560px)]">
          {alarmData.length > 0 ? (
            alarmData.map((alarm) => (
              <AlarmThumbnail
                key={alarm.id}
                alarm={alarm}
                markAsRead={markAsRead}
                removeAlarm={removeAlarm}
              />
            ))
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-sm my-auto gap-[30px]">
              <div className="flex flex-col text-center text-[#c9c9c9] text-[18px] leading-[25px]">
                <p>새 알림이 없습니다</p>
                <p>드림캐쳐 홈에서 재밌는 웹툰을 찾아보세요.</p>
              </div>
              <a
                href="/"
                className="text-white px-[60px] text-[18px] font-medium py-5 rounded-[10px] border border-1-[#fa973b] bg-[#fba250]"
              >
                드림케쳐 홈에서 웹툰 즐기기
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

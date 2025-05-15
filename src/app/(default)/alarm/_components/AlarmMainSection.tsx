'use client';
import React, { useEffect, useState } from 'react';
import { Alarm, mockAlarmData } from '@/app/mocks/alarm';
import AlarmThumbnail from './AlarmThumbnail';
import AlarmMainSectionHeader from './AlarmMainSectionHeader';
import EmptyAlarmState from './EmptyAlarmState';

export default function AlarmMainSection() {
  const [alarmData, setAlarmData] = useState<Alarm[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
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
      <div className="flex flex-col">
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
        <div className="w-full mt-[18px] mb-[12px] flex justify-between items-center">
          <AlarmMainSectionHeader
            markAllAsRead={markAllAsRead}
            clearAllAlarms={clearAllAlarms}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="flex flex-col min-h-[calc(100vh-560px)]">
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
            <EmptyAlarmState selectedCategory={selectedCategory} />
          )}
        </div>
      </div>
    </div>
  );
}

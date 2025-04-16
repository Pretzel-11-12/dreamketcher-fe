'use client';
import React, { useState, useEffect } from 'react';
import UserManagement from './UserManagement';
import { User } from '@/model/User';

interface BackofficeUserSectionProps {
  users: User[];
}

const BackofficeUserSection: React.FC<BackofficeUserSectionProps> = ({
  users,
}) => {
  return (
    <div className="flex flex-col w-[1200px] pt-8">
      <div className="flex items-center justify-center mb-10">
        <p className="text-lg">유저 관리</p>
        <p className="ml-2 text-sm text-gray-500">총 {users.length}명</p>
      </div>
      <div className="flex flex-col gap-5">
        {Array.isArray(users) ? (
          users.map((user) => <UserManagement key={user.id} user={user} />)
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BackofficeUserSection;

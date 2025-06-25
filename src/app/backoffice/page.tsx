'use client';

import React, { useState } from 'react';
import Sidebar from './_component/Sidebar';
import Dashboard from './_component/Dashboard';
import WebtoonList from './_component/WebtoonList';
import ApprovalManagement from './_component/ApprovalManagement';
import ReportManagement from './_component/ReportManagement';
import MemberManagement from './_component/MemberManagement';
import LogManagement from './_component/LogManagement';

export default function Backoffice() {
  const [activePage, setActivePage] = useState<string>('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;

      case 'webtoonList':
        return <WebtoonList />;

      case 'approvalManagement':
        return <ApprovalManagement />;

      case 'reportManagement':
        return <ReportManagement />;

      case 'memberManagement':
        return <MemberManagement />;

      case 'logManagement':
        return <LogManagement />;

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500">페이지를 선택해주세요</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1 mt-[70px]">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

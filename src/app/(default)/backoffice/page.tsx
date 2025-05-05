'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table } from '@/components/ui/table';
import {
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Sidebar from './_component/Sidebar';
import Dashboard from './_component/Dashboard';
import WebtoonList from './_component/WebtoonList';
import ApprovalManagement from './_component/ApprovalManagement';
import ReportManagement from './_component/ReportManagement';
import MemberManagement from './_component/MemberManagement';
import LogManagement from './_component/LogManagement';
export default function Backoffice() {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

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
        return (
          <MemberManagement
            setSelectedMember={setSelectedMember}
            setShowModal={setShowModal}
          />
        );

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
    <div className="flex flex-1">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>

      {/* 회원 정지 모달 */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>회원 정지</DialogTitle>
            <DialogDescription>
              회원 ID: {selectedMember}에 대한 정지 조치를 설정합니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">정지 기간</label>
              <Select defaultValue="7">
                <SelectTrigger>
                  <SelectValue placeholder="정지 기간 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1일</SelectItem>
                  <SelectItem value="3">3일</SelectItem>
                  <SelectItem value="7">7일</SelectItem>
                  <SelectItem value="15">15일</SelectItem>
                  <SelectItem value="30">30일</SelectItem>
                  <SelectItem value="permanent">영구 정지</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">정지 사유</label>
              <Select defaultValue="abuse">
                <SelectTrigger>
                  <SelectValue placeholder="정지 사유 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abuse">욕설/비방</SelectItem>
                  <SelectItem value="spam">스팸 활동</SelectItem>
                  <SelectItem value="illegal">불법 콘텐츠</SelectItem>
                  <SelectItem value="harassment">괴롭힘</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">상세 사유</label>
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder="상세 사유를 입력하세요"
              ></textarea>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              className="!rounded-button whitespace-nowrap"
            >
              취소
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 !rounded-button whitespace-nowrap"
              onClick={() => setShowModal(false)}
            >
              정지 적용
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

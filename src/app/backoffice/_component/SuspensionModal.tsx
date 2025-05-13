import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface SuspensionModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedMember: string | null;
}

export default function SuspensionModal({
  showModal,
  setShowModal,
  selectedMember,
}: SuspensionModalProps) {
  return (
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
            <label htmlFor="suspension-reason" className="text-sm font-medium">
              상세 사유
            </label>
            <textarea
              id="suspension-reason"
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
  );
}

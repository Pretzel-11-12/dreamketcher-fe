import React, { useState } from 'react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAdminMemberSuspend } from '@/app/api/fetchBackofficeData/postAdminMemberSuspend';
import { useToast } from '@/hooks/use-toast';

interface SuspensionModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  selectedMemberId: number | null;
}

// reasonCode 매핑 객체
const reasonCodeMap: Record<string, any> = {
  abuse: 'INSULT',
  spam: 'SPAM',
  illegal: 'ILLEGAL',
  harassment: 'VIOLENCE',
  other: 'ETC',
};

export default function SuspensionModal({
  showModal,
  setShowModal,
  selectedMemberId,
}: SuspensionModalProps) {
  const { toast } = useToast();
  const [suspensionDays, setSuspensionDays] = useState('7');
  const [reasonType, setReasonType] = useState('abuse');
  const [reasonDetail, setReasonDetail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  // 회원 정지 처리 뮤테이션
  const suspendMutation = useMutation({
    mutationFn: postAdminMemberSuspend,
    onSuccess: () => {
      // 성공 시 사용자 목록 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: '정지 처리 완료',
        description: '회원이 성공적으로 정지되었습니다.',
      });
      setShowModal(false);
    },
    onError: (error: Error) => {
      toast({
        title: '정지 처리 실패',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSuspend = () => {
    if (!selectedMemberId) {
      toast({
        title: '오류',
        description: '선택된 회원이 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    if (!reasonDetail.trim()) {
      toast({
        title: '입력 필요',
        description: '상세 사유를 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    suspendMutation.mutate({
      memberId: selectedMemberId,
      suspensionDays:
        suspensionDays === 'permanent' ? 36500 : parseInt(suspensionDays),
      reasonCode: reasonCodeMap[reasonType],
      suspensionReason: reasonDetail,
    });
  };

  // 모달이 닫힐 때 폼 초기화
  const handleCloseModal = () => {
    setShowModal(false);
    setSuspensionDays('7');
    setReasonType('abuse');
    setReasonDetail('');
  };

  return (
    <Dialog open={showModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원 정지</DialogTitle>
          <DialogDescription>
            회원 ID: {selectedMemberId}에 대한 정지 조치를 설정합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">정지 기간</label>
            <Select value={suspensionDays} onValueChange={setSuspensionDays}>
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
            <Select value={reasonType} onValueChange={setReasonType}>
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
              value={reasonDetail}
              onChange={(e) => setReasonDetail(e.target.value)}
            ></textarea>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCloseModal}
            className="!rounded-button whitespace-nowrap"
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 !rounded-button whitespace-nowrap"
            onClick={handleSuspend}
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리 중...' : '정지 적용'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

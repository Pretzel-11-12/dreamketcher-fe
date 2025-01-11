'use client';
import React from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { getAdminWebtoonApproval } from '@/app/api/fetchBackofficeData/putAdminWebtoonApproval';
import { getAdminWebtoonStatus } from '@/app/api/fetchBackofficeData/putAdminWebtoonStatus';

type WebtoonManagementProps = {
  webtoon: IWebtoon;
};

const WebtoonManagement: React.FC<WebtoonManagementProps> = ({ webtoon }) => {
  const handleApprove = async () => {
    try {
      const payload: {
        webtoonIds: number[];
        approval: 'APPROVED' | 'APPROVAL_DENIED';
        reason: string;
        detailReason: string;
      } = {
        webtoonIds: [webtoon.id],
        approval: 'APPROVED',
        reason: '',
        detailReason: '',
      };
      const result = await getAdminWebtoonApproval(payload);
      console.log('Approval Success:', result);
      alert('웹툰이 승인되었습니다.');
    } catch (error) {
      console.error('Approval Error:', error);
      alert('승인 요청 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async () => {
    try {
      const payload: {
        webtoonIds: number[];
        approval: 'APPROVED' | 'APPROVAL_DENIED';
        reason: string;
        detailReason: string;
      } = {
        webtoonIds: [webtoon.id],
        approval: 'APPROVAL_DENIED',
        reason: '',
        detailReason: '.',
      };
      const result = await getAdminWebtoonApproval(payload);
      console.log('Rejection Success:', result);
      alert('웹툰이 거절되었습니다.');
    } catch (error) {
      console.error('Rejection Error:', error);
      alert('거절 요청 중 오류가 발생했습니다.');
    }
  };

  const handleChangeStatus = async () => {
    try {
      const payload: {
        webtoonIds: number[];
        status: 'FINISH' | 'IN_SERIES' | 'REST';
      } = {
        webtoonIds: [webtoon.id],
        status: 'IN_SERIES',
      };
      const result = await getAdminWebtoonStatus(payload);
      console.log('Status Change Success:', result);
      alert('웹툰 상태가 변경되었습니다.');
    } catch (error) {
      console.error('Status Change Error:', error);
      alert('상태 변경 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex w-full h-[60px] cursor-pointer items-center border p-4 gap-1">
      <p className="w-[50px]">{webtoon.id}</p>
      <p className="w-[200px]">{webtoon.title}</p>
      <p className="w-[150px]">
        {webtoon.genres.map((genre) => `#${genre}`).join(', ')}
      </p>
      <p className="w-[150px]">{webtoon.member}</p>
      <p className="w-[150px]">웹툰 상태(임시)</p>
      <button
        className="bg-brand-yellow w-[50px] h-[40px] rounded-[10px] border-4"
        onClick={handleApprove}
      >
        승인
      </button>
      <button
        className="bg-brand-yellow w-[50px] h-[40px] rounded-[10px] border-4"
        onClick={handleReject}
      >
        거절
      </button>
      <button
        className="bg-brand-yellow w-[100px] h-[40px] rounded-[10px] border-4"
        onClick={handleChangeStatus}
      >
        상태 변경
      </button>
    </div>
  );
};

export default WebtoonManagement;

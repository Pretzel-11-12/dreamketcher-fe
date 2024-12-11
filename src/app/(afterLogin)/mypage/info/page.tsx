'use client';

import { useState } from 'react';

export default function InfoPage() {
  const [nickname, setNickname] = useState('린닝');

  const handleChangeNickname = () => {
    // 닉네임 변경 로직 추가
    alert(`닉네임이 "${nickname}"으로 변경되었습니다.`);
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>정보 변경</h1>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <label className='block text-gray-700 text-lg font-semibold mb-2'>
            닉네임
            <span className='ml-2 text-sm text-gray-500'>
              (최대 10자, 문자(a-z), 숫자(0-9) 가능)
            </span>
            <input
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className='mt-6 p-2 border border-gray-300 rounded w-full'
            />
          </label>
          <button
            onClick={handleChangeNickname}
            style={{ backgroundColor: '#FBA250' }}
            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600'
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
}

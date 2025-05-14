import React, { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TableBody, TableRow } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faEye,
  faSearch,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TableHead, TableHeader } from '@/components/ui/table';
import SuspensionModal from './SuspensionModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAdminUsers } from '@/app/api/fetchBackofficeData/getAdminUsers';
import { postAdminMemberActivate } from '@/app/api/fetchBackofficeData/postAdminMemberActivate';

interface User {
  id: number;
  nickname: string;
  email: string;
  businessEmail: string | null;
  imageUrl: string;
  status: 'ACTIVE' | 'SUSPENDED';
  suspendedUntil: string | null;
  suspensionReason: string | null;
  createdAt: string;
}

interface UserResponse {
  members: User[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
}

export default function MemberManagement() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'suspended'>('all');

  // 페이지네이션 상태
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(20);

  const queryClient = useQueryClient();

  // React Query를 사용하여 사용자 데이터 가져오기
  const { data, isLoading, error } = useQuery<UserResponse, Error>({
    queryKey: ['users', activeTab, page, size, searchTerm],
    queryFn: () =>
      getAdminUsers(activeTab === 'all' ? 'ACTIVE' : 'SUSPENDED', page, size),
    staleTime: 0, // 캐시 사용 안 함
    gcTime: 0,
  });

  const users = data?.members || [];
  const totalPages = data?.totalPages || 0;

  const handleSuspendMember = (memberId: string) => {
    setSelectedMember(Number(memberId));
    setShowModal(true);
  };

  // 탭 변경 시 첫 페이지로 초기화
  const handleTabChange = (value: 'all' | 'suspended') => {
    setActiveTab(value);
    setPage(0);
  };

  // 사용자 정지 해제 mutation
  const resumeUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      return await postAdminMemberActivate({ memberId: userId });
    },
    onSuccess: () => {
      // 성공 시 사용자 목록 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // 사용자 정지 해제 핸들러
  const handleResumeUser = (userId: string) => {
    resumeUserMutation.mutate(Number(userId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">회원 관리</h1>
        <div className="flex space-x-2">
          <Input
            placeholder="회원 검색"
            className="w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                queryClient.invalidateQueries({ queryKey: ['users'] });
              }
            }}
          />
          <Button
            className="!rounded-button whitespace-nowrap"
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ['users'] })
            }
            disabled={true}
          >
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            검색
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={(value) => handleTabChange(value as 'all' | 'suspended')}
      >
        <TabsList className="mb-4">
          <TabsTrigger
            value="all"
            className="!rounded-button whitespace-nowrap"
          >
            전체 회원
          </TabsTrigger>
          <TabsTrigger
            value="suspended"
            className="!rounded-button whitespace-nowrap"
          >
            정지 회원
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="shadow-md">
            {isLoading ? (
              <div className="p-4 text-center">데이터를 불러오는 중...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">
                {error.message}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>닉네임</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead>비즈니스 이메일</TableHead>
                    <TableHead>가입일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        사용자 데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user: User) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.nickname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.businessEmail || '-'}</TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === 'ACTIVE'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }
                          >
                            {user.status === 'ACTIVE' ? '활성' : '정지'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {user.status === 'ACTIVE' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                                onClick={() =>
                                  handleSuspendMember(user.id.toString())
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faBan}
                                  className="mr-1"
                                />{' '}
                                정지
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                                onClick={() =>
                                  handleResumeUser(user.id.toString())
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faUndo}
                                  className="mr-1"
                                />{' '}
                                해제
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap"
                            >
                              <FontAwesomeIcon icon={faEye} className="mr-1" />{' '}
                              보기
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
            {/* 페이지네이션 컨트롤 */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 my-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  이전
                </Button>
                <span className="flex items-center mx-2">
                  {page + 1} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page === totalPages - 1}
                >
                  다음
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="suspended">
          <Card className="shadow-md">
            {isLoading ? (
              <div className="p-4 text-center">데이터를 불러오는 중...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">
                {error.message}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>닉네임</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead>정지일</TableHead>
                    <TableHead>정지 기간</TableHead>
                    <TableHead>사유</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        정지된 사용자가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user: User) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.nickname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.suspendedUntil
                            ? new Date(user.suspendedUntil).toLocaleDateString()
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {user.suspendedUntil
                            ? `${Math.ceil(
                                (new Date(user.suspendedUntil).getTime() -
                                  new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}일`
                            : '-'}
                        </TableCell>
                        <TableCell>{user.suspensionReason || '-'}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                              onClick={() =>
                                handleResumeUser(user.id.toString())
                              }
                            >
                              <FontAwesomeIcon icon={faUndo} className="mr-1" />{' '}
                              해제
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap"
                            >
                              <FontAwesomeIcon icon={faEye} className="mr-1" />{' '}
                              보기
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
            {/* 페이지네이션 컨트롤 */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 my-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  이전
                </Button>
                <span className="flex items-center mx-2">
                  {page + 1} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page === totalPages - 1}
                >
                  다음
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* 회원 정지 모달 */}
      <SuspensionModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedMemberId={selectedMember}
      />
    </div>
  );
}

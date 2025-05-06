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

interface MemberManagementProps {
  setSelectedMember: (memberId: string) => void;
  setShowModal: (show: boolean) => void;
}

export default function MemberManagement({
  setSelectedMember,
  setShowModal,
}: MemberManagementProps) {
  const handleSuspendMember = (memberId: string) => {
    setSelectedMember(memberId);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">회원 관리</h1>
        <div className="flex space-x-2">
          <Input placeholder="회원 검색" className="w-64" />
          <Button className="!rounded-button whitespace-nowrap">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            검색
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>가입일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>user1234</TableCell>
                  <TableCell>김사용</TableCell>
                  <TableCell>user1234@example.com</TableCell>
                  <TableCell>2024-12-15</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">활성</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                        onClick={() => handleSuspendMember('user1234')}
                      >
                        <FontAwesomeIcon icon={faBan} className="mr-1" /> 정지
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>user2345</TableCell>
                  <TableCell>이웹툰</TableCell>
                  <TableCell>user2345@example.com</TableCell>
                  <TableCell>2025-01-20</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">활성</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                        onClick={() => handleSuspendMember('user2345')}
                      >
                        <FontAwesomeIcon icon={faBan} className="mr-1" /> 정지
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>user3456</TableCell>
                  <TableCell>박독자</TableCell>
                  <TableCell>user3456@example.com</TableCell>
                  <TableCell>2025-02-05</TableCell>
                  <TableCell>
                    <Badge className="bg-red-500">정지</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faUndo} className="mr-1" /> 해제
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>user4567</TableCell>
                  <TableCell>최만화</TableCell>
                  <TableCell>user4567@example.com</TableCell>
                  <TableCell>2025-03-10</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">활성</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                        onClick={() => handleSuspendMember('user4567')}
                      >
                        <FontAwesomeIcon icon={faBan} className="mr-1" /> 정지
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="suspended">
          <Card className="shadow-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>정지일</TableHead>
                  <TableHead>정지 기간</TableHead>
                  <TableHead>사유</TableHead>
                  <TableHead>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>user3456</TableCell>
                  <TableCell>박독자</TableCell>
                  <TableCell>user3456@example.com</TableCell>
                  <TableCell>2025-05-01</TableCell>
                  <TableCell>7일</TableCell>
                  <TableCell>욕설/비방</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faUndo} className="mr-1" /> 해제
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>user5678</TableCell>
                  <TableCell>정댓글</TableCell>
                  <TableCell>user5678@example.com</TableCell>
                  <TableCell>2025-04-28</TableCell>
                  <TableCell>30일</TableCell>
                  <TableCell>스팸 활동</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faUndo} className="mr-1" /> 해제
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>user7890</TableCell>
                  <TableCell>한신고</TableCell>
                  <TableCell>user7890@example.com</TableCell>
                  <TableCell>2025-05-03</TableCell>
                  <TableCell>14일</TableCell>
                  <TableCell>불법 콘텐츠 공유</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faUndo} className="mr-1" /> 해제
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

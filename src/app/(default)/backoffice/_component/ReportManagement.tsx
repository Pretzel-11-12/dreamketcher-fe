import { Badge } from '@/components/ui/badge';

import { Table, TableHead, TableHeader } from '@/components/ui/table';

import { TableBody, TableRow } from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  faBan,
  faEye,
  faUndo,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ReportManagement() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">신고 관리</h1>

      <Tabs defaultValue="comment">
        <TabsList className="mb-4">
          <TabsTrigger
            value="comment"
            className="!rounded-button whitespace-nowrap"
          >
            댓글 신고
          </TabsTrigger>
          <TabsTrigger
            value="episode"
            className="!rounded-button whitespace-nowrap"
          >
            에피소드 신고
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comment">
          <Card className="shadow-md">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">댓글 신고 목록</h2>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="처리 상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="pending">미처리</SelectItem>
                      <SelectItem value="processed">처리됨</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="!rounded-button whitespace-nowrap">
                    <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    필터
                  </Button>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>신고자</TableHead>
                  <TableHead>댓글 내용</TableHead>
                  <TableHead>작성자</TableHead>
                  <TableHead>신고 사유</TableHead>
                  <TableHead>신고일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>R001</TableCell>
                  <TableCell>user5678</TableCell>
                  <TableCell className="max-w-xs truncate">
                    이 웹툰 정말 재미없어요. 시간 낭비했네요.
                  </TableCell>
                  <TableCell>user1234</TableCell>
                  <TableCell>부적절한 내용</TableCell>
                  <TableCell>2025-05-04</TableCell>
                  <TableCell>
                    <Badge className="bg-yellow-500">미처리</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faBan} className="mr-1" /> 제재
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
                  <TableCell>R002</TableCell>
                  <TableCell>user7890</TableCell>
                  <TableCell className="max-w-xs truncate">
                    이 작가는 표절 의혹이 있어요. 다른 웹툰과 너무 비슷해요.
                  </TableCell>
                  <TableCell>user2345</TableCell>
                  <TableCell>허위 사실 유포</TableCell>
                  <TableCell>2025-05-03</TableCell>
                  <TableCell>
                    <Badge className="bg-yellow-500">미처리</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faBan} className="mr-1" /> 제재
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
                  <TableCell>R003</TableCell>
                  <TableCell>user3456</TableCell>
                  <TableCell className="max-w-xs truncate">
                    욕설 포함된 내용
                  </TableCell>
                  <TableCell>user5678</TableCell>
                  <TableCell>욕설/비방</TableCell>
                  <TableCell>2025-05-02</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">처리됨</Badge>
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
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="episode">
          <Card className="shadow-md">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">에피소드 신고 목록</h2>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="처리 상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="pending">미처리</SelectItem>
                      <SelectItem value="processed">처리됨</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="!rounded-button whitespace-nowrap">
                    <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    필터
                  </Button>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>신고자</TableHead>
                  <TableHead>웹툰</TableHead>
                  <TableHead>에피소드</TableHead>
                  <TableHead>신고 사유</TableHead>
                  <TableHead>신고일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>E001</TableCell>
                  <TableCell>user1234</TableCell>
                  <TableCell>판타지 세계의 기사</TableCell>
                  <TableCell>15화</TableCell>
                  <TableCell>성인 콘텐츠</TableCell>
                  <TableCell>2025-05-04</TableCell>
                  <TableCell>
                    <Badge className="bg-yellow-500">미처리</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                      >
                        <FontAwesomeIcon icon={faBan} className="mr-1" /> 제재
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
                  <TableCell>E002</TableCell>
                  <TableCell>user5678</TableCell>
                  <TableCell>미스터리 탐정</TableCell>
                  <TableCell>8화</TableCell>
                  <TableCell>폭력적 콘텐츠</TableCell>
                  <TableCell>2025-05-03</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">처리됨</Badge>
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
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

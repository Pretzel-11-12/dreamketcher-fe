import { Table, TableHead, TableHeader } from '@/components/ui/table';

import { TableBody, TableRow } from '@/components/ui/table';

import { TableCell } from '@/components/ui/table';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faFilter } from '@fortawesome/free-solid-svg-icons';

export default function ApprovalManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">작품 승인 관리</h1>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="승인 상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="pending">검토중</SelectItem>
              <SelectItem value="approved">승인됨</SelectItem>
              <SelectItem value="rejected">거부됨</SelectItem>
            </SelectContent>
          </Select>
          <Button className="!rounded-button whitespace-nowrap">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            필터
          </Button>
        </div>
      </div>

      <Card className="shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>작가</TableHead>
              <TableHead>제출일</TableHead>
              <TableHead>장르</TableHead>
              <TableHead>승인 상태</TableHead>
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1004</TableCell>
              <TableCell>우주 모험</TableCell>
              <TableCell>최우주</TableCell>
              <TableCell>2025-05-01</TableCell>
              <TableCell>SF</TableCell>
              <TableCell>
                <Badge className="bg-yellow-500">검토중</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-1" /> 승인
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-1" /> 거부
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1006</TableCell>
              <TableCell>역사 다시보기</TableCell>
              <TableCell>한역사</TableCell>
              <TableCell>2025-05-03</TableCell>
              <TableCell>역사</TableCell>
              <TableCell>
                <Badge className="bg-yellow-500">검토중</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-1" /> 승인
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-1" /> 거부
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1007</TableCell>
              <TableCell>스포츠 열정</TableCell>
              <TableCell>윤스포츠</TableCell>
              <TableCell>2025-05-04</TableCell>
              <TableCell>스포츠</TableCell>
              <TableCell>
                <Badge className="bg-yellow-500">검토중</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-100 text-green-700 hover:bg-green-200 !rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-1" /> 승인
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-100 text-red-700 hover:bg-red-200 !rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-1" /> 거부
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

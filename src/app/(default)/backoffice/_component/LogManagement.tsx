import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faChevronRight,
  faChevronLeft,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
export default function LogManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">로그 관리</h1>
        <div className="flex space-x-2">
          <Input type="date" className="w-40" />
          <span className="flex items-center">~</span>
          <Input type="date" className="w-40" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="로그 유형" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="login">로그인</SelectItem>
              <SelectItem value="content">콘텐츠 변경</SelectItem>
              <SelectItem value="user">회원 관리</SelectItem>
              <SelectItem value="report">신고 처리</SelectItem>
            </SelectContent>
          </Select>
          <Button className="!rounded-button whitespace-nowrap">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            검색
          </Button>
        </div>
      </div>

      <Card className="shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>시간</TableHead>
              <TableHead>관리자</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>유형</TableHead>
              <TableHead>액션</TableHead>
              <TableHead>대상</TableHead>
              <TableHead>상세</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2025-05-05 09:15:32</TableCell>
              <TableCell>admin01</TableCell>
              <TableCell>192.168.1.101</TableCell>
              <TableCell>콘텐츠 변경</TableCell>
              <TableCell>작품 승인</TableCell>
              <TableCell>판타지 세계의 기사</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2025-05-05 08:42:15</TableCell>
              <TableCell>admin02</TableCell>
              <TableCell>192.168.1.102</TableCell>
              <TableCell>회원 관리</TableCell>
              <TableCell>회원 정지</TableCell>
              <TableCell>user1234</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2025-05-04 17:30:45</TableCell>
              <TableCell>admin01</TableCell>
              <TableCell>192.168.1.101</TableCell>
              <TableCell>신고 처리</TableCell>
              <TableCell>댓글 제재</TableCell>
              <TableCell>comment_id_58392</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2025-05-04 15:12:30</TableCell>
              <TableCell>admin03</TableCell>
              <TableCell>192.168.1.103</TableCell>
              <TableCell>신고 처리</TableCell>
              <TableCell>에피소드 신고 처리</TableCell>
              <TableCell>episode_id_29384</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2025-05-04 09:05:22</TableCell>
              <TableCell>admin02</TableCell>
              <TableCell>192.168.1.102</TableCell>
              <TableCell>로그인</TableCell>
              <TableCell>로그인 성공</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <div className="flex justify-center mt-4">
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="!rounded-button whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="!rounded-button whitespace-nowrap"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="!rounded-button whitespace-nowrap"
          >
            2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="!rounded-button whitespace-nowrap"
          >
            3
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="!rounded-button whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
    </div>
  );
}

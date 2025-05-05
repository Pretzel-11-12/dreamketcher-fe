import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  faSearch,
  faEye,
  faEdit,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function WebtoonList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">웹툰 목록</h1>
        <div className="flex space-x-2">
          <Input placeholder="웹툰 검색" className="w-64" />
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
              <TableHead>ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>작가</TableHead>
              <TableHead>장르</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>승인 상태</TableHead>
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1001</TableCell>
              <TableCell>판타지 세계의 기사</TableCell>
              <TableCell>김작가</TableCell>
              <TableCell>판타지</TableCell>
              <TableCell>
                <Badge className="bg-green-500">연재중</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-500">승인됨</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> 편집
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1002</TableCell>
              <TableCell>일상 로맨스</TableCell>
              <TableCell>이그림</TableCell>
              <TableCell>로맨스</TableCell>
              <TableCell>
                <Badge className="bg-orange-500">휴재중</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-500">승인됨</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> 편집
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1003</TableCell>
              <TableCell>미스터리 탐정</TableCell>
              <TableCell>박스토리</TableCell>
              <TableCell>미스터리</TableCell>
              <TableCell>
                <Badge className="bg-blue-500">완결</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-500">승인됨</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> 편집
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1004</TableCell>
              <TableCell>우주 모험</TableCell>
              <TableCell>최우주</TableCell>
              <TableCell>SF</TableCell>
              <TableCell>
                <Badge className="bg-green-500">연재중</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-yellow-500">검토중</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> 편집
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1005</TableCell>
              <TableCell>학교 일상</TableCell>
              <TableCell>정스쿨</TableCell>
              <TableCell>일상</TableCell>
              <TableCell>
                <Badge className="bg-red-500">중단</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-red-500">거부됨</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" /> 보기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> 편집
                  </Button>
                </div>
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
            <FontAwesomeIcon icon={faChevronLeft} className="mr-1" />
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
            <FontAwesomeIcon icon={faChevronRight} className="mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

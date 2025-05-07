'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFlag,
  faCheckCircle,
  faUserSlash,
  faBook,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

// 카드 데이터 상수
interface Cardata {
  title: string;
  value: number;
  icon: IconDefinition;
  iconColor: string;
  bgColor: string;
  change: string;
  changeColor: string;
  transitionDuration: number;
}
const cardData = [
  {
    title: '신규 신고',
    value: 24,
    icon: faFlag,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-100',
    change: '12% 증가',
    changeColor: 'text-green-500',
    transitionDuration: 0.5,
  },
  {
    title: '미처리 작품 승인',
    value: 8,
    icon: faCheckCircle,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100',
    change: '5% 감소',
    changeColor: 'text-red-500',
    transitionDuration: 1.0,
  },
  {
    title: '정지 회원',
    value: 15,
    icon: faUserSlash,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-100',
    change: '8%   ',
    changeColor: 'text-green-500',
    transitionDuration: 1.5,
  },
  {
    title: '총 웹툰',
    value: 72,
    icon: faBook,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-100',
    change: '15% 증가',
    changeColor: 'text-green-500',
    transitionDuration: 2.0,
  },
];

// 카드 컴포넌트
function CardComponent({ data }: { data: Cardata }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: data.transitionDuration }}
    >
      <Card className="p-4 shadow-md">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">{data.title}</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold">{data.value}</span>
            <div
              className={`w-10 h-10 rounded-full ${data.bgColor} flex items-center justify-center`}
            >
              <FontAwesomeIcon icon={data.icon} className={data.iconColor} />
            </div>
          </div>
          <span className={`text-xs ${data.changeColor} mt-2`}>
            <FontAwesomeIcon icon={data.icon} /> {data.change}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Dashboard() {
  const reportChartRef = useRef<HTMLDivElement>(null);
  const statusChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reportChartRef.current) {
      const reportChart = echarts.init(reportChartRef.current);
      const reportOption = {
        animation: false,
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['댓글 신고', '에피소드 신고'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['5월 1일', '5월 2일', '5월 3일', '5월 4일', '5월 5일'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '댓글 신고',
            type: 'line',
            data: [12, 15, 8, 10, 7],
            color: '#FF9F43',
          },
          {
            name: '에피소드 신고',
            type: 'line',
            data: [5, 3, 6, 4, 2],
            color: '#2B3A67',
          },
        ],
      };
      reportChart.setOption(reportOption);

      // 동일한 함수 참조를 사용해 add/remove
      const handleResize = () => {
        reportChart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        reportChart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (statusChartRef.current) {
      const statusChart = echarts.init(statusChartRef.current);
      const statusOption = {
        animation: false,
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: '작품 상태',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 48, name: '연재중', itemStyle: { color: '#4CAF50' } },
              { value: 12, name: '휴재중', itemStyle: { color: '#FF9800' } },
              { value: 8, name: '완결', itemStyle: { color: '#2196F3' } },
              { value: 4, name: '중단', itemStyle: { color: '#F44336' } },
            ],
          },
        ],
      };
      statusChart.setOption(statusOption);

      window.addEventListener('resize', () => {
        statusChart.resize();
      });

      return () => {
        statusChart.dispose();
        window.removeEventListener('resize', () => {
          statusChart.resize();
        });
      };
    }
  }, []);

  const graphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((data, index) => (
          <CardComponent key={index} data={data} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 }, // 오른쪽에서 시작
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-4">최근 신고 현황</h2>
            <div ref={reportChartRef} className="w-full h-64"></div>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 }, // 오른쪽에서 시작
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-4">작품 상태별 통계</h2>
            <div ref={statusChartRef} className="w-full h-64"></div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 }, // 오른쪽에서 시작
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-4">최근 활동 로그</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시간</TableHead>
                <TableHead>관리자</TableHead>
                <TableHead>활동</TableHead>
                <TableHead>대상</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2025-05-05 09:15</TableCell>
                <TableCell>admin01</TableCell>
                <TableCell>작품 승인</TableCell>
                <TableCell>판타지 세계의 기사</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2025-05-05 08:42</TableCell>
                <TableCell>admin02</TableCell>
                <TableCell>회원 정지</TableCell>
                <TableCell>user1234</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2025-05-04 17:30</TableCell>
                <TableCell>admin01</TableCell>
                <TableCell>댓글 제재</TableCell>
                <TableCell>comment_id_58392</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2025-05-04 15:12</TableCell>
                <TableCell>admin03</TableCell>
                <TableCell>에피소드 신고 처리</TableCell>
                <TableCell>episode_id_29384</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
}

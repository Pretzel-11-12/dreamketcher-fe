export interface Alarm {
  id: number;
  type:
    | 'UPDATE'
    | 'BEST_COMMENT'
    | 'NEW_COMMENT'
    | 'FAVORITE_WEBTOON'
    | 'COMMENT_WRITTEN'
    | 'COMMENT_RECOMMEND'
    | 'COMMENT_LIKE'
    | 'COMMENT_DISLIKE'
    | 'COMMENT_REPORT'
    | 'COMMENT_DELETE'
    | 'COMMENT_EDIT'
    | 'REPLY_WRITTEN';
  imgUrl: string;
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export const mockAlarmData: Alarm[] = [
  {
    id: 1,
    type: 'UPDATE',
    imgUrl: '/assets/images/alarm-thumbnail-1.jpg',
    title: '낮에 뜨는 달',
    content: '낮에 뜨는 달 116화',
    createdAt: '2025-05-06',
    isRead: false,
  },
  {
    id: 2,
    type: 'UPDATE',
    imgUrl: '/assets/images/alarm-thumbnail-1.jpg',
    title: '낮에 뜨는 달',
    content: '낮에 뜨는 달 공지사항',
    createdAt: '2025-05-06',
    isRead: false,
  },
  {
    id: 3,
    type: 'BEST_COMMENT',
    imgUrl: '',
    title: '낮에 뜨는 달 - 116화',
    content: '베스트 댓글로 선정되었어요!',
    createdAt: '2025-05-05',
    isRead: true,
  },
  {
    id: 4,
    type: 'REPLY_WRITTEN',
    imgUrl: '',
    title: '낮에 뜨는 달 - 116화',
    content: '댓글에 답글이 달렸어요!',
    createdAt: '2025-05-04',
    isRead: false,
  },
  {
    id: 5,
    type: 'FAVORITE_WEBTOON',
    imgUrl: '/assets/images/alarm-thumbnail-3.jpg',
    title: '낮에 뜨는 달',
    content:
      '낮에 뜨는 달 - 축하드려요! 작품이 첫 관심 웹툰으로 등록되었습니다.',
    createdAt: '2025-05-05',
    isRead: false,
  },
  {
    id: 6,
    type: 'FAVORITE_WEBTOON',
    imgUrl: '/assets/images/alarm-thumbnail-3.jpg',
    title: '낮에 뜨는 달',
    content:
      '낮에 뜨는 달 - 축하드려요! 작품이 총 10개의 관심 웹툰으로 등록되었습니다.',
    createdAt: '2025-05-05',
    isRead: false,
  },
  {
    id: 7,
    type: 'COMMENT_WRITTEN',
    imgUrl: '/assets/images/alarm-thumbnail-4.jpg',
    title: '낮에 뜨는 달 - 116화',
    content: '낮에 뜨는 달 - 축하드려요! 116화에 첫댓글이 달렸습니다.!',
    createdAt: '2025-05-04',
    isRead: false,
  },
  {
    id: 8,
    type: 'COMMENT_WRITTEN',
    imgUrl: '/assets/images/alarm-thumbnail-4.jpg',
    title: '낮에 뜨는 달 - 116화',
    content: '낮에 뜨는 달 - 축하드려요! 116화에 10개의 댓글이 달렸습니다!!',
    createdAt: '2025-05-03',
    isRead: false,
  },
];

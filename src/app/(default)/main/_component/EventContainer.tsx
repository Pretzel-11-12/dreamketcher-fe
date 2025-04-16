import Image from 'next/image';
import EventViewer from './EventViewer';
import EventThumbnail from './EventThumbnail';
const EventRomanceWebtoonData = [
  {
    id: 1,
    title: '그렇게 물거품이 되어도',
    member: '다홍',
    thumbnail: '/assets/images/event-webtoon-thumbnail-1.jpg',
    genre: '로맨스',
    lastEpisode: 55,
    averageStar: 0,
    numOfStars: 0,
    story:
      ' 인간과의 사랑으로 지느러미를 잃고 인간이 된 미아는 다시 인어로 되돌아가는 방법을 찾기 위해 여행을 떠난다. 그러던 어느 날 미아는 괴물이 되어버린 인어들과 마주치게 되는데..',
    tags: ['로맨스', '인외', '청춘물', '성장'],
  },
  {
    id: 2,
    title: '조조코믹스',
    member: '이동건',
    thumbnail: '/assets/images/event-webtoon-thumbnail-2.jpg',
    genre: '로맨스',
    lastEpisode: 179,
    averageStar: 0,
    numOfStars: 0,
    story:
      "애나의 친구법 제1조 1항 ‘친구는 성별 상관없이 동등하다’ 법대로 했을 뿐인데 자꾸 하이와 이상한 상황에 놓이는 애나! 혹시 나는 지금 친구법의 허점을 이용해 '썸'을 즐기는 건 아닐까?",
    tags: ['비밀연애', '짝사랑', '친구 > 연인', '친구법', '로맨스'],
  },
];

const EventFantasyWebtoonData = [
  {
    id: 3,
    title: '99강화나무몽둥이',
    member: '홍실/지페리',
    thumbnail: '/assets/images/event-webtoon-thumbnail-3.jpg',
    genre: '판타지',
    lastEpisode: 18,
    averageStar: 0,
    numOfStars: 0,
    story:
      "약육강식이 진리인 가상 현실 게임 '크로노 라이프'. 허접이라며 무시만 당하던 '나'는 우연히 얻은 초보용 기본 무기 '나무 뭉둥이' 를 +99 강화까지 성공하게 되고, 본인을 무시하던 놈들을 찾아다니며 몽둥이로 무자비하...",
    tags: ['사이다', '게임물', '병맛', '인외', '청춘물', '성장'],
  },
  {
    id: 4,
    title: '작두',
    member: '232/POGO',
    thumbnail: '/assets/images/event-webtoon-thumbnail-4.jpg',
    genre: '판타지',
    lastEpisode: 24,
    averageStar: 0,
    numOfStars: 0,
    story:
      "미신따윈 믿지않는 주인공 '권용진'. 그의 만 16세의 생일이 지나자 눈 앞에 펼쳐진 믿을 수 없는 일들.",
    tags: ['오컬트판타지', '동양', '이능력', '로맨스'],
  },
];

export default function EventContainer() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-[14px]">
            <div className="flex gap-[2px] h-5 items-center">
              <p className="text-[18px] font-medium text-titleBlack leading-[20px]">
                연재 응원 이벤트 - 로맨스
              </p>
              <div className="relative w-5 h-5">
                <Image src="/assets/icon/romance.png" alt="romance icon" fill />
              </div>
            </div>
            <div className="flex flex-row gap-10 items-center">
              {EventRomanceWebtoonData.map((webtoon) => (
                <EventThumbnail key={webtoon.id} webtoon={webtoon} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[14px]">
            <div className="flex gap-[2px] h-5 items-center">
              <p className="text-[18px] font-medium text-titleBlack leading-[20px]">
                연재 응원 이벤트 - 판타지
              </p>
              <div className="relative w-5 h-5">
                <Image src="/assets/icon/fantasy.png" alt="fantasy icon" fill />
              </div>
            </div>
            <div className="flex flex-row gap-10 items-center">
              {EventFantasyWebtoonData.map((webtoon) => (
                <EventThumbnail key={webtoon.id} webtoon={webtoon} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <EventViewer />
    </div>
  );
}

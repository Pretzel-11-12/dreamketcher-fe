export const highlightKeyword = (text: string, keyword: string) => {
  if (!text) return ''; // text가 undefined일 경우 빈 문자열 반환
  if (!keyword) return text; // 키워드가 없으면 원본 텍스트 반환

  const parts = text.split(new RegExp(`(${keyword})`, 'gi')); // 키워드로 분리
  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className="font-bold">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

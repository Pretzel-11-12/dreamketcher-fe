import { genres } from '@/constants/genres';

export interface Webtoon {
  // ... 다른 필드들
  genre: (typeof genres)[number]['param'];
  // ... 다른 필드들
}

import { z } from 'zod';

//스키마 제목
export const title = '이미지';

// 스키마 정의
export const VdImagesSchema = z.object({
  id: z.string(),
  title: z.string(),
  version: z.string(),
  modified: z.string(),
  created: z.string(),
  url: z.string(),
});
// 타입 추론
export type VdImages = z.infer<typeof VdImagesSchema>;

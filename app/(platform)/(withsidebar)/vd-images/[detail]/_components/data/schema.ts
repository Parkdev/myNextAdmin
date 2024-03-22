import { z } from 'zod';

// 스키마 제목
export const title = '버전';

// 스키마 정의
export const imgDetailSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: z.string(),
  status: z.number(),
  defaultImg: z.string(),
  isModifiedImg: z.boolean(),
  modified: z.string(),
  created: z.string(),
});
// 타입 추론
export type ImgDetail = z.infer<typeof imgDetailSchema>;

import { z } from 'zod';

// 스키마 제목
export const title = 'VDI Workspace';

// 스키마 정의
export const VdiListSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  sessionCount: z.number(),
  loadBalance: z.string(),
  modified: z.string(),
  created: z.string(),
});
// 타입 추론
export type VdiList = z.infer<typeof VdiListSchema>;

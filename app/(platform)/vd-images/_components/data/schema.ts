import { z } from 'zod';

// 스키마 정의
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  version: z.string(),
  modified: z.string(),
  created: z.string(),
  url: z.string(),
});
// 타입 추론
export type Task = z.infer<typeof taskSchema>;

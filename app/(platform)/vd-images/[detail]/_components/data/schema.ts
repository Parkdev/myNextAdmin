import { z } from 'zod';

// 스키마 정의
export const taskSchema = z.object({
  id: z.string(),
  version: z.string(),
  description: z.string(),
  status: z.number(),
  defaultImg: z.string(),
  isModifiedImg: z.boolean(),
  modified: z.string(),
  created: z.string(),
});
// 타입 추론
export type Task = z.infer<typeof taskSchema>;

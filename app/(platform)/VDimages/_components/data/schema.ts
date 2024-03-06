import { z } from 'zod';

// 스키마 정의
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});
// 타입 추론
export type Task = z.infer<typeof taskSchema>;

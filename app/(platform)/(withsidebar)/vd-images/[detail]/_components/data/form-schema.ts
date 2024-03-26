import { z } from 'zod';

export const versionFormSchema = z.object({
  title: z
    .string({ required_error: '이름을 입력해주세요' })
    .min(2, { message: '2글자 이상 입력해주세요' })
    .max(50),
  type: z.string({
    required_error: '유형을 선택해주세요',
  }),
  image: z.string({
    required_error: '이미지를 선택해주세요',
  }),
  version: z.string({
    required_error: '버전을 선택해주세요',
  }),
  rule: z.string({
    required_error: '버전 명명 규칙을 정해주세요',
  }),
});

export type versionForm = z.infer<typeof versionFormSchema>;

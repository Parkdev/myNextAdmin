import { z } from 'zod';

export const subscribeFormSchema = z.object({
  imageName: z
    .string({ required_error: '이름을 입력해주세요' })
    .min(2, { message: '2글자 이상 입력해주세요' })
    .max(50),
  description: z
    .string({
      required_error: '설명을 입력해주세요',
    })
    .min(2)
    .max(100),
  subscribe: z.string({
    required_error: '구독을 선택해주세요',
  }),
});

export type subscribeForm = z.infer<typeof subscribeFormSchema>;

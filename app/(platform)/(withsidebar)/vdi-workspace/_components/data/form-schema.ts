import { z } from 'zod';

export const VDIFormSchema = z.object({
  name: z
    .string({ required_error: '이름을 입력해주세요' })
    .min(2, { message: '2글자 이상 입력해주세요' })
    .max(50),
  location: z.string({
    required_error: '위치를 선택해주세요',
  }),
  category: z.string({
    required_error: '유형을 선택해주세요',
  }),
  loadBalance: z.string({
    required_error: '로드밸런싱 유형을 선택해주세요',
  }),
  sessionLimit: z.number({
    required_error: '수치를 입력해주세요',
  }),
  image: z.string({
    required_error: '이미지를 선택해주세요',
  }),
  spec: z.string({
    required_error: '사양을 선택해주세요',
  }),
  diskSize: z.string({
    required_error: '디스크 크기를 선택해주세요',
  }),
  VDnetwork: z.string({
    required_error: '가상 네트워크를 선택해주세요',
  }),
  subnet: z.string({
    required_error: '서브넷을 선택해주세요',
  }),
  VDMCount: z.number({
    required_error: '가상 머신 수를 입력해주세요 선택해주세요',
  }),
  retentionPolicy: z.boolean(),
  timeAllocate: z.boolean(),
  connector: z.string({
    required_error: '커넥터를 선택해주세요',
  }),
  accessGroup: z.string({
    required_error: '그룹을 선택해주세요',
  }),
});

export type VDIForm = z.infer<typeof VDIFormSchema>;

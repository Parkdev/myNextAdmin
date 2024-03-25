'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useSidePopStore } from '@/store/table-popup-store';

const versionFormSchema = z.object({
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

interface CreateVersionProps {
  subject: string;
}

// const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

export function CreateVersion({ subject }: CreateVersionProps) {
  //상태관리
  const isOpen = useSidePopStore(state => state.open);
  const isMod = useSidePopStore(state => state.isMod) ? '수정' : '생성';
  const rowData = useSidePopStore(state => state.row);
  const changePopStatus = useSidePopStore(state => state.switch);
  //임시 데이터
  const [typeList] = useState(['구독1', '구독2', '구독3']);
  const [imageList] = useState(['이미지1', '이미지2', '이미지3']);
  const [versionList] = useState(['버전1', '버전2', '버전3']);
  const [ruleList] = useState(['규칙1', '규칙2', '규칙3']);

  const form = useForm<versionForm>({
    resolver: zodResolver(versionFormSchema),
    // defaultValues: {
    //   title: '기존 이미지 이름',
    // },
  });

  useEffect(() => {
    form.reset();
    form.setValue('title', rowData?.title ?? '');
    form.setValue('type', '구독1');
    form.setValue('image', '이미지1');
    form.setValue('version', '버전1');
    form.setValue('rule', '규칙1');
  }, [isOpen]);

  function onSubmit(values: versionForm) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    changePopStatus();
  }

  return (
    <Sheet open={isOpen} onOpenChange={changePopStatus}>
      <SheetContent className="w-full sm:w-[540px]">
        <SheetHeader className="mb-4">
          <SheetTitle>
            {subject} {isMod}
          </SheetTitle>
          <SheetDescription>
            {isMod}할 {subject}의 상세 정보를 입력하세요.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">이미지 명</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이미지 이름을 입력해주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">이미지 유형</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="유형을 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeList.map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">이미지 선택</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="이미지를 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {imageList.map((image, idx) => (
                        <SelectItem key={idx} value={image}>
                          {image}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">버전 선택</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="버전을 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {versionList.map((version, idx) => (
                        <SelectItem key={idx} value={version}>
                          {version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">이미지 유형</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="버전 규칙 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ruleList.map((rule, idx) => (
                        <SelectItem key={idx} value={rule}>
                          {rule}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">{isMod}</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

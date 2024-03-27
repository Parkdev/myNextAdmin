'use client';

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
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useSidePopStore } from '@/store/table-popup-store';
import { versionFormSchema, versionForm } from './data/form-schema';
import { InputItem } from '@/components/input/input-components';

interface CreateVersionProps {
  subject: string;
}

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
            <InputItem
              inputType="text"
              form={form}
              name="title"
              label="이미지 명"
              placeholder="이미지 이름을 입력해주세요."
            />
            <InputItem
              inputType="select"
              form={form}
              name="type"
              label="이미지 유형"
              placeholder="유형을 선택해주세요"
              selectList={typeList}
            />
            <InputItem
              inputType="select"
              form={form}
              name="image"
              label="이미지 선택"
              placeholder="이미지를 선택해주세요"
              selectList={imageList}
            />
            <InputItem
              inputType="select"
              form={form}
              name="version"
              label="버전 선택"
              placeholder="버전을 선택해주세요"
              selectList={versionList}
            />
            <InputItem
              inputType="select"
              form={form}
              name="rule"
              label="버전 규칙"
              placeholder="버전 규칙 선택"
              selectList={ruleList}
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

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
import { subscribeFormSchema, subscribeForm } from './data/form-schema';
import { InputItem } from '@/components/input/input-components';

interface CreateImageProps {
  subject: string;
}

// const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

export function CreateImage({ subject }: CreateImageProps) {
  //상태관리
  const isOpen = useSidePopStore(state => state.open);
  const isMod = useSidePopStore(state => state.isMod) ? ' 수정' : ' 생성';
  const rowData = useSidePopStore(state => state.row);
  const changePopStatus = useSidePopStore(state => state.switch);

  //임시 데이터
  const [subscribeList] = useState(['구독1', '구독2', '구독3']);

  const form = useForm<subscribeForm>({
    resolver: zodResolver(subscribeFormSchema),
    // defaultValues: {
    //   imageName: '초기값',
    // },
  });

  useEffect(() => {
    form.reset();
    form.setValue('imageName', rowData?.id ?? '');
    form.setValue('description', rowData?.title ?? '');
    form.setValue('subscribe', '구독1');
  }, [isOpen]);

  function onSubmit(values: subscribeForm) {
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
    <>
      <Sheet open={isOpen} onOpenChange={changePopStatus}>
        <SheetContent className="w-full sm:w-[540px]">
          <SheetHeader className="mb-4">
            <SheetTitle>
              {subject} {isMod}
            </SheetTitle>
            <SheetDescription>
              {isMod}할 {subject}의 정보를 입력해주세요
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputItem
                inputType="select"
                form={form}
                name="subscribe"
                label="구독"
                placeholder="구독을 선택해주세요"
                selectList={subscribeList}
              />
              <InputItem
                inputType="text"
                form={form}
                name="imageName"
                label="이미지명"
                placeholder="이름을 입력해주세요"
              />
              <InputItem
                inputType="textarea"
                form={form}
                name="description"
                label="설명"
                placeholder="설명을 입력해주세요"
              />
              <SheetFooter>
                <Button type="submit">{isMod}</Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}

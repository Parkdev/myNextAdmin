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
              <FormField
                control={form.control}
                name="subscribe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>구독</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="구독을 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subscribeList.map((subscribe, idx) => (
                          <SelectItem key={idx} value={subscribe}>
                            {subscribe}
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
                name="imageName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이미지명</FormLabel>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>설명</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
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
    </>
  );
}

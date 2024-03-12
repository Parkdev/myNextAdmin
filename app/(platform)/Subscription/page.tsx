'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

// 스키마 정의
const FormSchema = z.object({
  subscription: z.string({
    required_error: 'Please select a correct subscription to submit',
  }),
});

const SubscriptionPage = () => {
  // 폼 상태 관리
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  // 폼 데이터 전송
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: '등록 완료',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-300 p-4">
          {data.subscription}
        </pre>
      ),
    });
    // action 추가 이후 이동 필요
    // router.push('VDimages');
  }

  const { data: session, status } = useSession();

  useEffect(() => {
    axios
      .get(
        'https://management.azure.com/subscriptions?api-version=2022-12-01',
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      )
      .then(res => console.log('success'))
      .catch(err => console.log(err));
  }, [session]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-6">
      <div className="flex flex-col space-y-2 text-center justify-center">
        <h1 className="text-2xl font-bold tracking-tight ">
          Azure 구독 연결하기
        </h1>
        <p className="text-sm text-muted-foreground">
          Azure 구독을 연결해주세요
        </p>
      </div>
      <div className="w-full flex flex-col gap-y-6 justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-md w-1/2 space-y-6"
          >
            <FormField
              control={form.control}
              name="subscription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Subscription</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your subscription" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Subscription1">
                        Subscription1
                      </SelectItem>
                      <SelectItem value="Subscription2">
                        Subscription2
                      </SelectItem>
                      <SelectItem value="Subscription3">
                        Subscription3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    도움이 필요하시면{' '}
                    <Link className="underline text-blue-500" href="/docs">
                      여기를
                    </Link>{' '}
                    눌러주세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              연결하기
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubscriptionPage;

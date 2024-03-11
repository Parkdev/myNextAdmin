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

const FormSchema = z.object({
  subscription: z.string({
    required_error: 'Please select a correct subscription to submit',
  }),
});

const SubscriptionPage = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight ">
          Azure 구독 연결하기
        </h1>
        <p className="text-sm text-muted-foreground">
          Azure 구독을 연결해주세요
        </p>
      </div>
      <div className="flex flex-col gap-y-6">
        <form action="">
          <div className="grid gap-2">
            <div className="grid gap-1"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPage;

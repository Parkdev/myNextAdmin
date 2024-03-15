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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

const subscribeFormSchema = z.object({
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
  subscribe2: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .min(2)
    .max(100),
});

interface CreateImageProps {
  btnText: string;
}

const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

export function CreateImage({ btnText }: CreateImageProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof subscribeFormSchema>>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      imageName: '이미지 1',
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">+ 새 {btnText} 생성</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{btnText} 생성</SheetTitle>
          <SheetDescription>
            생성할 {btnText}의 상세 정보를 입력하세요.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="imageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="이미지 1" {...field} />
                  </FormControl>
                  <FormDescription>이미지를 입력해주세요</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>설명을 입력해주세요</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscribe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="이미지 1" {...field} />
                  </FormControl>
                  <FormDescription>이미지를 입력해주세요</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="이미지 1" {...field} />
                  </FormControl>
                  <FormDescription>이미지를 입력해주세요</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <form>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              이미지 이름
            </Label>
            <Input id="name" value="이름" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              설명
            </Label>
            <Input
              id="username"
              value="설명을 입력해주세요"
              className="col-span-3"
            />
          </div>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">저장하기</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

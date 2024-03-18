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
  const [subscribeList] = useState(['구독1', '구독2', '구독3']);

  const form = useForm<z.infer<typeof subscribeFormSchema>>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      imageName: '이미지 1',
    },
  });

  function onSubmit(values: z.infer<typeof subscribeFormSchema>) {
    console.log(values);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">+ 새 {btnText} 생성</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[540px]">
        <SheetHeader className="mb-4">
          <SheetTitle>{btnText} 생성</SheetTitle>
          <SheetDescription>
            생성할 {btnText}의 상세 정보를 입력하세요.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imageName"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="이미지 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscribe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">저장하기</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

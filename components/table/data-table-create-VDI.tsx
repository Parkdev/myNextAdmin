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

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useSidePopStore } from '@/store/table-popup-store';

const VDIFormSchema = z.object({
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
  LBtype: z.string({
    required_error: '로드밸런싱 유형을 선택해주세요',
  }),
  sessionLimit: z.string({
    required_error: '세션 제한을 입력해주세요',
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
  retention: z.boolean(),
  bizHour: z.boolean(),
  connector: z.string({
    required_error: '커넥터를 선택해주세요',
  }),
  accessGroup: z.string({
    required_error: '그룹을 선택해주세요',
  }),
});

export type VDIForm = z.infer<typeof VDIFormSchema>;

interface CreateVDIProps {
  subject: string;
}

export function CreateVDI({ subject }: CreateVDIProps) {
  //상태관리
  const isOpen = useSidePopStore(state => state.open);
  const isMod = useSidePopStore(state => state.isMod) ? '수정' : '생성';
  const rowData = useSidePopStore(state => state.row);
  const changePopStatus = useSidePopStore(state => state.switch);
  //임시 데이터
  const [locationList] = useState(['East US', '위치2', '위치3']);
  const [categoryList] = useState(['공용', '유형2', '유형3']);
  const [loadBalanceList] = useState(['폭 우선', '버전2', '버전3']);
  const [ruleList] = useState(['규칙1', '규칙2', '규칙3']);

  const form = useForm<VDIForm>({
    resolver: zodResolver(VDIFormSchema),
    // defaultValues: {
    //   title: '기존 이미지 이름',
    // },
  });

  // useEffect(() => {
  //   form.reset();
  //   form.setValue('title', rowData.title);
  //   form.setValue('type', '구독1');
  //   form.setValue('category', '이미지1');
  //   form.setValue('version', '버전1');
  //   form.setValue('rule', '규칙1');
  // }, [isOpen]);

  function onSubmit(values: VDIForm) {
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
        {/* tabs */}
        <Tabs defaultValue="workspace" className="w-[400px]">
          <TabsList className="flax w-full">
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="vm">Virtual Machine</TabsTrigger>
            <TabsTrigger value="policy">Policy</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/*  테스트 */}
              <TabsContent value="workspace">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Workspace 이름 설정
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Workspace 이름을 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">위치</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="위치를 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locationList.map((item, idx) => (
                            <SelectItem key={idx} value={item}>
                              {item}
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Workspace 유형
                      </FormLabel>
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
                          {categoryList.map((item, idx) => (
                            <SelectItem key={idx} value={item}>
                              {item}
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
                  name="LBtype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        로드밸런스 선택
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="알고리즘을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {loadBalanceList.map((item, idx) => (
                            <SelectItem key={idx} value={item}>
                              {item}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Workspace 이름 설정
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Workspace 이름을 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button>다음</Button>
              </TabsContent>
              {/* VM탭 */}
              <TabsContent value="vm">VM탭</TabsContent>
              {/* 정책 탭 */}
              <TabsContent value="policy">
                {/* <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Use different settings for my mobile devices
                          </FormLabel>
                          <FormDescription>
                            You can manage your mobile notifications in the{' '}
                            <Link href="/examples/forms">mobile settings</Link>{' '}
                            page.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  /> */}
                <SheetFooter>
                  <Button type="submit">{isMod}</Button>
                </SheetFooter>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

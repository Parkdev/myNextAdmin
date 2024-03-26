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
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useSidePopStore } from '@/store/table-popup-store';
import { InputItem } from '@/components/input/input-components';
import { VDIFormSchema, VDIForm } from './data/form-schema';

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
  const [tab, setTab] = useState('0');

  const form = useForm<VDIForm>({
    resolver: zodResolver(VDIFormSchema),
    // defaultValues: {
    //   title: '기존 이미지 이름',
    // },
  });

  useEffect(() => {
    form.reset();
    // form.setValue('title', rowData.title);
    // form.setValue('type', '구독1');
    // form.setValue('category', '이미지1');
    // form.setValue('version', '버전1');
    // form.setValue('rule', '규칙1');
  }, [isOpen]);

  const onSubmit = (values: VDIForm) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    changePopStatus();
  };

  const onTabChange = (value: string) => {
    setTab(value);
  };

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
        <Tabs value={tab} onValueChange={onTabChange} className="">
          <TabsList className="flex w-full">
            <TabsTrigger value="0">Workspace</TabsTrigger>
            <TabsTrigger value="1">Virtual Machine</TabsTrigger>
            <TabsTrigger value="2">Policy</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Workspace 탭 */}
              <TabsContent value="0" className="space-y-6">
                <InputItem
                  inputType="text"
                  form={form}
                  name="name"
                  label="Workspace 이름 설정"
                  placeholder="이름을 입력해주세요"
                />
                <InputItem
                  inputType="select"
                  form={form}
                  name="location"
                  label="위치"
                  placeholder="위치를 선택해주세요"
                  selectList={locationList}
                />
                <InputItem
                  inputType="select"
                  form={form}
                  name="category"
                  label="Workspace 유형"
                  placeholder="유형을 선택해주세요"
                  selectList={categoryList}
                />
                <InputItem
                  inputType="select"
                  form={form}
                  name="loadBalance"
                  label="부하 분산 알고리즘 선택"
                  placeholder="알고리즘을 선택해주세요"
                  selectList={locationList}
                />
                <InputItem
                  inputType="number"
                  form={form}
                  name="sessionLimit"
                  label="최대 세션 제한"
                  placeholder="수치를 입력해주세요"
                />
                <SheetFooter className="flex space-x-4">
                  <Button variant="outline" onClick={() => onTabChange('1')}>
                    다음
                  </Button>
                  <Button type="submit">{isMod}</Button>
                </SheetFooter>
              </TabsContent>
              {/* VM탭 */}
              <TabsContent value="1">
                <InputItem
                  inputType="checkbox"
                  form={form}
                  name="retentionPolicy"
                  label="데이터 보존 정책 할당"
                />
                <SheetFooter className="flex space-x-4">
                  <Button variant="outline" onClick={() => onTabChange('2')}>
                    다음
                  </Button>
                  <Button type="submit">{isMod}</Button>
                </SheetFooter>
              </TabsContent>

              {/* 정책 탭 */}
              <TabsContent value="2">
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
                {/* <SheetFooter>
                  <Button type="submit">{isMod}</Button>
                </SheetFooter> */}
                <SheetFooter className="flex space-x-4">
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

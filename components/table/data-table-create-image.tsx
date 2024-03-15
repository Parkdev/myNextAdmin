import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface CreateImageProps {
  btnText: string;
}

export function CreateImage({ btnText }: CreateImageProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">+ 새 {btnText} 생성</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>이미지 생성</SheetTitle>
          <SheetDescription>
            생성할 이미지의 이름과 설명을 입력하세요.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
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
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">저장하기</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

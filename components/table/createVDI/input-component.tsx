import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { subscribeForm } from '../data-table-create-image';
import { VDIForm } from '../data-table-create-VDI';
import { ImgDetail } from '@/app/(platform)/(withsidebar)/vd-images/[detail]/_components/data/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export type InputItemProps = {
  inputType: string;
  form: UseFormReturn<VDIForm | subscribeForm | ImgDetail>;
  formName: keyof VDIForm | keyof subscribeForm | keyof ImgDetail;
  label: string;
  description?: string;
  placeholder: string;
  selectList?: string[];
};

export const InputItem: React.FC<InputItemProps> = ({
  inputType,
  form,
  formName,
  label,
  description,
  placeholder,
  selectList,
}) => {
  if (inputType === 'text') {
    return (
      <FormField
        control={form.control}
        name={formName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} value={field.value.toString()} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (inputType === 'select') {
    return (
      <FormField
        control={form.control}
        name={formName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">위치</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="위치를 선택해주세요" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectList?.map((item, idx) => (
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
    );
  }
  if (inputType === 'checkbox') {
    return (
      <FormField
        control={form.control}
        name={formName}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Use different settings for my mobile devices
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    );
  }
  return <></>;
};

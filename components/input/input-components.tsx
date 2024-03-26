'use client';

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
import { subscribeForm } from '../../../app/(platform)/(withsidebar)/vd-images/_components/data-table-create-image';
import { VDIForm } from '../../../app/(platform)/(withsidebar)/vdi-workspace/_components/data-table-create-VDI';
import { ImgDetail } from '@/app/(platform)/(withsidebar)/vd-images/[detail]/_components/data/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export type InputItemProps = {
  inputType: string;
  form: UseFormReturn<any>;
  name: keyof VDIForm | keyof subscribeForm | keyof ImgDetail;
  label: string;
  description?: string;
  placeholder?: string;
  selectList?: string[];
};

export const InputItem: React.FC<InputItemProps> = ({
  inputType,
  form,
  name,
  label,
  description,
  placeholder,
  selectList,
}) => {
  if (inputType === 'text') {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                value={field.value ? field.value.toString() : ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  if (inputType === 'number') {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">{label}</FormLabel>
            <FormControl>
              <Input type="number" placeholder={placeholder} {...field} />
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
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
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
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
            </div>
          </FormItem>
        )}
      />
    );
  }
  return <></>;
};

import { ImgDetail } from '@/app/(platform)/(withsidebar)/vd-images/[detail]/_components/data/schema';
import { VdImages } from '@/app/(platform)/(withsidebar)/vd-images/_components/data/schema';

import { create } from 'zustand';

type PopupStore<TData> = {
  open: boolean;
  isMod: boolean;
  row: TData;
  switch: () => void;
  setMod: (pp: boolean) => void;
  update: (newRow?: TData) => void;
};

export const useImageStore = create<PopupStore<VdImages>>(set => ({
  open: false,
  isMod: false,
  row: { id: '', title: '', version: '', modified: '', created: '', url: '' },
  switch: () => set(state => ({ open: !state.open })),
  setMod: pp => set(state => ({ isMod: pp })),
  update: newRow =>
    set(state => ({
      open: !state.open,
      row: newRow
        ? { ...newRow }
        : {
            id: '',
            title: '',
            version: '',
            modified: '',
            created: '',
            url: '',
          },
    })),
}));

export const useVersionStore = create<PopupStore<ImgDetail>>(set => ({
  open: false,
  isMod: false,
  row: {
    id: '',
    version: '',
    title: '',
    status: 0,
    defaultImg: '',
    isModifiedImg: false,
    modified: '',
    created: '',
  },
  switch: () => set(state => ({ open: !state.open })),
  setMod: pp => set(state => ({ isMod: pp })),
  update: newRow =>
    set(state => ({
      open: !state.open,
      row: newRow
        ? { ...newRow }
        : {
            id: '',
            version: '',
            title: '',
            status: 0,
            defaultImg: '',
            isModifiedImg: false,
            modified: '',
            created: '',
          },
    })),
}));
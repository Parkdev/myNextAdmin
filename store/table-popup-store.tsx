import { create } from 'zustand';

export type PopupStore<TData> = {
  open: boolean;
  isMod: boolean;
  row?: TData;
  switch: () => void;
  setMod: (pp: boolean) => void;
  update: (newRow?: any) => void;
};

export type SetMod = (pp: boolean) => void;
export type Update = (newRow?: any) => void;

export const useSidePopStore = create<PopupStore<any>>(set => ({
  open: false,
  isMod: false,
  row: undefined,
  switch: () => set(state => ({ open: !state.open })),
  setMod: pp => set(state => ({ isMod: pp })),
  update: newRow =>
    set(state => ({
      open: !state.open,
      row: newRow ? { ...newRow } : undefined,
    })),
}));

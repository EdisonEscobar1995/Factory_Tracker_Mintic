import { ReactNode } from "react";

export const nextNumber = (next = 1) => {
  let n = next;
  return () => {
    n += 1;
    return n;
  };
};

const nextMenuIndex = nextNumber(3);

export const createMenu = (label: string, url: string, icon: ReactNode, key: string, replace: boolean) => ({
  icon,
  label,
  index: nextMenuIndex(),
  key,
  path: url,
  replace
});

export const createMenuParent = (icon: ReactNode, key: string, subMenus: any[], label: string) => ({
  icon,
  index: nextMenuIndex(),
  key,
  label,
  subMenus,
  items: subMenus
});

export const pathTreatment = (path: string): string => {
  if (path?.split('/').length > 1) {
    return path.split('/')[1];
  }
  return '';
};

export const ordenarLista = (list: any, field: string) => {
  return list.sort((a: any, b: any) => (a[field] > b[field]) ? 1 : -1);
};

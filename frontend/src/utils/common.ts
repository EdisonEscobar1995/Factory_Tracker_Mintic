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

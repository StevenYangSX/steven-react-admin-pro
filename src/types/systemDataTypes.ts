import { AxiosResponse } from "axios";

export interface ExtendedAxiosResponse<T, D> extends AxiosResponse<T, D> {
  message?: string;
  T: T;
  D: D;
}

export interface SystemMenuItem {
  menuId?: number;
  key?: string;
  icon?: string;
  children: Array<SystemMenuItem> | null;
  parentId: number;
  path: string;
  menuName: string;
  uniqAuth: string;
}

export interface SysterUserInfo {
  access?: string[];
  userId: number;
  username: string;
}

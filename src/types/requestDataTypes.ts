export interface LoginRequestType {
  username: string;
  password: string;
}

export interface AddOrModifySystemMenuItemRequestType {
  menuId?: number;
  sort?: number;
  icon?: string;
  parentId: number | null;
  path: string;
  menuName: string;
  uniqAuth: string;
  menuType: 0 | 1;
}

export interface deleteMenuByIdType {
  menuId: number;
}

export interface getUserAccessListRequestType {
  userId: number | undefined;
}

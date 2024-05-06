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



export interface AddSystemRoleRequestType {
  roleName:string,
  access:number[]
}

export interface ModifySystemRoleRequestType extends AddSystemRoleRequestType {
  roleId:number
}

export interface DeleteSystemRoleRequestType {
  roleId:number
}


export interface DeleteSystemUserRequestType {
  userId:number
}

export interface AddSystemUserRequestType {
  username:string,
  password:string,
  passwordConfirmed:string,
  nickname:string,
  userRole:number[]
}

export interface UpdateSystemUserRequestType extends AddSystemUserRequestType {
  userId:number
}

type SortType = "DESC" | "ASC"

export interface PageableRequestType {
  current?:number,
  pageSize?:number,
  sort?: SortType,
  total?:number

}
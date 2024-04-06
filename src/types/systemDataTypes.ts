export interface SystemMenuItem {
    key?:string,
    icon?: string;
    children: Array<SystemMenuItem> | null;
    parentId: number;
    path: string;
    menuName: string;
    uniqAuth: string;
  }


  
export  interface SysterUserInfo {
    access?:string[],
    userId:number,
    username:string
  }
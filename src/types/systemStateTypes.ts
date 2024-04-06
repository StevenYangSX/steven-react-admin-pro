import { SysterUserInfo } from '@/types/systemDataTypes'

export interface UserInfoState {
    token:string | null
    userInfo: SysterUserInfo | null,
    expiredTime:number | null,
    menuList: Array<any> | null
  }
  
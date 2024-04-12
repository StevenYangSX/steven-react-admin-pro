import { SysterUserInfo } from '@/types/systemDataTypes'
import { SystemMenuItem } from '@/types/systemDataTypes'
// userinfo state type
export interface UserInfoState {
    token:string | null
    userInfo: SysterUserInfo | null,
    expiredTime:number | null,
    menuList: Array<SystemMenuItem> | null
  }
  

// http status state type
  export const enum HttpStatus {
    Idle = 'idel',
    Loading = 'loading',
    Success = 'success',
    Failed = 'failed',
  }


interface HttpErrorObject {
  message?:string | undefined
}
// a test async thunk state type
export interface ServerHealthState {
  serverRunning : boolean,
  httpStatus:HttpStatus,
  error: HttpErrorObject  | null
}



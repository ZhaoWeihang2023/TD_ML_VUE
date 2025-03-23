import { request } from '@/utils/request';

export interface ValidationUserInfo {
  list: [{ logid: string; logName: string; userRoles: string }];
}

const Api = {
  UserLogin: '/Login/getlogin',
};

export function AuthenticateUser(username: string, password: string) {
  return request.post<ValidationUserInfo>({
    url: Api.UserLogin,
    data: {
      logname: username,
      logpass: password,
    },
  });
}

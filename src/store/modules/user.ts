import { defineStore } from 'pinia';

import { AuthenticateUser, ValidationUserInfo } from '@/api/authlogin';
import { usePermissionStore } from '@/store';
import type { UserInfo } from '@/types/interface';

const InitUserInfo: UserInfo = {
  name: '', // 用户名，用于展示在页面右上角头像处
  roles: [], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'main_token', // 默认token不走权限
    userInfo: { ...InitUserInfo },
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      const mockLogin = async (userInfo: Record<string, unknown>) => {
        console.log(`用户信息:`, userInfo);
        const { account, password } = userInfo;

        const data: ValidationUserInfo = await AuthenticateUser(<string>account, <string>password);

        if (data.list[0].logName !== '') {
          this.userInfo.name = data.list[0].logName;
          this.userInfo.roles = [data.list[0].userRoles]; // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用

          return {
            code: 200,
            message: '登录成功',
            data: 'main_token',
          };
        }

        return {
          code: 401,
          message: '登录失败，请检查用户名或密码是否正确',
        };

        // const token = {
        //   main_: 'main_token',
        //   dev_: 'dev_token',
        // }[<string>password];
      };

      const res = await mockLogin(userInfo);
      if (res.code === 200) {
        this.token = res.data;
      } else {
        throw res;
      }
    },
    async getUserInfo() {
      const mockRemoteUserInfo = async (token: string) => {
        if (token === 'main_token') {
          return {
            name: this.userInfo.name,
            roles: this.userInfo.roles, // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
          };
        }
        return {
          name: 'td_dev',
          roles: ['UserIndex', 'DashboardBase', 'login'], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
        };
      };
      const res = await mockRemoteUserInfo(this.token);

      this.userInfo = res;
    },
    async logout() {
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
    },
    key: 'user',
    paths: ['token'],
  },
});

import type { MenuListResult } from '@/api/model/permissionModel';
import { request } from '@/utils/request';

const Api = {
  MenuList: '/MenuList',
};

export function getMenuList() {
  return request.get<MenuListResult>({
    url: Api.MenuList,
  });
}

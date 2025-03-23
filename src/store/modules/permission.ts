/**
 * 导入 pinia 中的 defineStore 函数，用于定义状态管理的 store
 */
import { defineStore } from 'pinia';
/**
 * 导入 vue-router 中的 RouteRecordRaw 类型，用于表示路由记录
 */
import { RouteRecordRaw } from 'vue-router';

/**
 * 导入自定义的 RouteItem 类型，用于表示菜单列表项
 */
import { RouteItem } from '@/api/model/permissionModel';
/**
 * 导入获取菜单列表的 API 函数
 */
import { getMenuList } from '@/api/permission';
/**
 * 导入 vue-router 实例、固定路由列表和首页路由列表
 */
import router, { fixedRouterList, homepageRouterList } from '@/router';
/**
 * 导入 pinia 的 store 实例
 */
import { store } from '@/store';
/**
 * 导入将对象转换为路由记录的工具函数
 */
import { transformObjectToRoute } from '@/utils/route';

/**
 * 定义一个名为 'permission' 的状态管理 store
 * @returns {Object} 返回一个包含状态和操作的 store 对象
 */
export const usePermissionStore = defineStore('permission', {
  /**
   * 定义 store 的初始状态
   * @returns {Object} 返回初始状态对象
   */
  state: () => ({
    // 白名单路由，不需要权限验证的路由
    whiteListRouters: ['/login'],
    // 当前应用的路由列表
    routers: [],
    // 已移除的路由列表
    removeRoutes: [],
    // 动态加载的路由列表
    asyncRoutes: [],
  }),
  /**
   * 定义 store 的操作方法
   */
  actions: {
    /**
     * 初始化路由列表
     * @returns {Promise<void>} 无返回值
     */
    async initRoutes() {
      // 注释部分提供了不同的路由展示方案
      // const accessedRouters = this.asyncRoutes;

      // 在菜单展示全部路由
      // this.routers = [...homepageRouterList, ...accessedRouters, ...fixedRouterList];
      // 在菜单只展示动态路由和首页
      // this.routers = [...homepageRouterList, ...accessedRouters];
      // 在菜单只展示动态路由
      // this.routers = [...accessedRouters];

      // 当前实现是将首页路由和固定路由合并到 routers 中
      this.routers = [...homepageRouterList, ...fixedRouterList];
    },
    /**
     * 异步构建动态路由
     * @returns {Promise<Array<RouteRecordRaw>>} 返回动态路由列表
     */
    async buildAsyncRoutes() {
      try {
        // 发起菜单权限请求，获取菜单列表
        const asyncRoutes: Array<RouteItem> = (await getMenuList()).list;
        // 将菜单列表转换为路由记录
        this.asyncRoutes = transformObjectToRoute(asyncRoutes);
        // 初始化路由列表
        await this.initRoutes();
        // 返回动态路由列表
        return this.asyncRoutes;
      } catch (error) {
        // 若构建路由失败，抛出错误
        throw new Error("Can't build routes");
      }
    },
    /**
     * 恢复路由状态
     * @returns {Promise<void>} 无返回值
     */
    async restoreRoutes() {
      // 不需要在此额外调用 initRoutes 更新侧边导航内容，在登录后 asyncRoutes 为空会调用
      // 遍历 asyncRoutes 列表，移除所有动态路由
      this.asyncRoutes.forEach((item: RouteRecordRaw) => {
        router.removeRoute(item.name);
      });
      // 清空 asyncRoutes 列表
      this.asyncRoutes = [];
    },
  },
});

/**
 * 获取 'permission' store 的实例
 * @returns {Object} 返回 'permission' store 的实例
 */
export function getPermissionStore() {
  return usePermissionStore(store);
}

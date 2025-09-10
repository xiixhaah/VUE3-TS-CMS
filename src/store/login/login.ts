import router from '@/router'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface LoginState {
  token: string
  userInfo: any
  userMenu: any
}

const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    token: '',
    userInfo: {},
    userMenu: []
  }),
  actions: {
    async loginAccountAction(account: any) {
      // 1.帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      // const name = loginResult.data.name
      this.token = loginResult.data.token

      // 2.token进行本地缓存，这一步要在getUserInfoById()前
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.获取登录用户的详细信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 4.根据角色请求用户的权限菜单menu
      const userMenuResult = await getUserMenuByRoleId(this.userInfo.role.id)
      const userMenu = userMenuResult.data
      this.userMenu = userMenu

      // 5.进行本地缓存（userInfo、userMenu）
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenu', userMenu)

      // 5.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 6.动态菜单路由
      const routes = mapMenusToRoutes(userMenu)
      routes.forEach((route) => router.addRoute('main', route))

      console.log(
        '完整路由列表:',
        router.getRoutes().map((r) => r.path)
      )

      //3.登陆成功跳转到/main页面
      router.push('/main')
    },

    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu

        // 5.请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenu)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore

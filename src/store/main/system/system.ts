import {
  creatPageData,
  creatUserData,
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async creatUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await creatUserData(userInfo)
      console.log(newResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 针对页面的数据: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      // 1.删除数据操作
      const deleteResult = deletePageById(pageName, id)
      console.log(deleteResult)

      // 重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async creatPageDataAction(pageName: string, userInfo: any) {
      // 1.创建新的用户
      const newResult = await creatPageData(pageName, userInfo)
      console.log(newResult)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      // 1.更新用户数据
      const editResult = await editPageData(pageName, id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore

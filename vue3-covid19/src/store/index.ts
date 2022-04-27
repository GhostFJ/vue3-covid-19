/*
 * @Author: FunJust
 * @Date: 2022-04-26 21:52:19
 * @Description: 
 */
import {defineStore} from 'pinia'
import { fetchData } from '../server'
import type { Children, RootObject } from './type'
import { ChinaAdd, ChinaTotal, StatisGradeCityDetail } from '../../../.history/vue3-novid19/src/store/type_20220426224810';

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    info: <RootObject>{},
    childs: <Children[]>[],
    chinaAdds: <ChinaAdd>{},
    chinaTotals: <ChinaTotal>{},
    cityDetail: <StatisGradeCityDetail[]>[]
  }),

  actions: {
    async getList() {
      const result = await fetchData()
      console.log('result: ', result);
      this.info = result.data
      this.chinaAdds = this.info.diseaseh5Shelf.chinaAdd
      this.chinaTotals = this.info.diseaseh5Shelf.chinaTotal
      this.cityDetail = this.info.statisGradeCityDetail.sort((a, b) => b.confirm - a.confirm).slice(0, 10)
    }
  }
})
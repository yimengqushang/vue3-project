// 封装banner轮播图相关的业务代码

import { onMounted, ref } from 'vue';
import { getBannerAPI } from '@/api/home.js'


export function useBanner() {
    const bannerList = ref([])
    const getBanner = async() => {
        const res = await getBannerAPI({
            distributionSite: '2'
        })
        bannerList.value = res.result
    }

    onMounted(() => getBanner())

    return {
        bannerList
    }
}
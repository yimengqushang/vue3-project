// 封装分类数据业务相关代码
import { getTopCategoryAPI } from '@/api/category.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async(id = route.params.id) => {
        const res = await getTopCategoryAPI(id)
        categoryData.value = res.result
    }

    onMounted(() => getCategory())

    // 路由参数变化的时候，可以把分类数据接口重新发送
    // 使用组件守卫避免多次调用相同的banner数据
    onBeforeRouteUpdate((to) => {
        // 使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}
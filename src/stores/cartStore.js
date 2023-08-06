// 购物车模块

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user.js';
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/api/cart.js';


export const userCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
        // 1.定义state
    const cartList = ref([])

    // 2.定义action
    // 添加购物车
    const addCart = async(goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            // 登录之后的加入购车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            // 添加购物车推荐
            // 已添加过 count + 1
            // 未添加过 直接push()
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count += goods.count
            } else {
                // 没找到
                cartList.value.push(goods)
            }
        }

    }

    // 获取最新购物车列表action
    const updateNewList = async() => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    // 删除购物车
    const delCart = async(skuId) => {
        if (isLogin.value) {
            // 调用接口实现接口购物车中的删除功能
            await delCartAPI([skuId])
            updateNewList()
        } else {
            // 1.用splice找到要删除项的下标值
            // 2.使用数组的过滤方法filter()
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
    }

    // 清除购物车
    const clearCart = () => {
        cartList.value = []
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
        // 通过skuId找到要修改的那一项，然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
        // 把cartList中每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    // 计算属性
    // 1.总的数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
        // 2.总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
        // 3.已选数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
        // 4.已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
}, {
    persist: true,
})
// 购物车模块

import { defineStore } from 'pinia';
import { ref } from 'vue';

// 1.定义state
const cartList = ref([])
export const userCartStore = defineStore('cart', () => {
    // 2.定义action
    const addCart = (goods) => {
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

    // 删除购物车
    const delCart = (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }
    return {
        cartList,
        addCart,
        delCart
    }
}, {
    persist: true,
})
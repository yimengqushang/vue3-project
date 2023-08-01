import httpInstance from '@/utils/http.js'

// 获取banner

export function getBannerAPI() {
    return httpInstance({
        url: '/home/banner'
    })
}


export function findNewAPI() {
    return httpInstance({
        url: '/home/new'
    })
}

export const getHotAPI = () => {
    return httpInstance('home/hot')
}
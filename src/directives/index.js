// 定义懒加载插件

// vueUse
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app) {
        // 懒加载指令逻辑
        app.directive('img-lazy', {
            mounted(el, binding) {
                console.log(el, binding.value);
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        // 进入视口区域
                        if (isIntersecting) {
                            el.src = binding.value
                            stop()
                        }
                    },
                )
            }
        })
    }
}
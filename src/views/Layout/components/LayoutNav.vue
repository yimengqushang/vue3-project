<script setup>
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';

const useStore = useUserStore()
const router = useRouter()

const confirm = () => {
  // console.log('用户要退出登录了');
  // 退出登录业务逻辑实现
  // 1.清除用户信息,触发action
  useStore.clearUserInfo()
  // 2.跳转登录页
  router.replace({ path: '/login' })
}

</script>
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="useStore.userInfo.token">
          <li>
            <RouterLink to="/member"><i class="iconfont icon-user"></i>{{ useStore.userInfo.account }}</RouterLink>
          </li>
          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li>
            <RouterLink to="/member/order">我的订单</RouterLink>
          </li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
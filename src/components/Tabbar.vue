<template>
    <footer>
        <!-- 编程式导航 ， 路由3之前 -->
        <!-- <ul>
      <li><router-link to="/films" active-class="bottom-bar-active">电影</router-link></li>
      <li><router-link to="/cinemas" active-class="bottom-bar-active">影院</router-link></li>
      <li><router-link to="/center" active-class="bottom-bar-active">我的</router-link></li>
    </ul> -->
        <!-- 路由4 -->
        <ul>
            <router-link v-for="item in routerLink" :key="item.link" :to="item.link" custom
                v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="isActive ? 'bottom-bar-active' : ''">
                    <i :class="item.icon | addclass"></i>
                    <span>{{ item.name }}</span>
                </li>
            </router-link>
        </ul>
    </footer>
</template>

<script>
import '@/assets/icon/iconfont.css'
import Vue from 'vue'

Vue.filter('addclass', (data) => {
    return `iconfont ${data}`
})
export default {
    props: {
        routerLink: {
            type: Array
        }
    }
}
</script>

<style lang="scss">
.bottom-bar-active {
    color: red;
    font-size: 16rem;
}

footer {
    width: 100%;
    height: 60rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFF;
    box-shadow: -5px 0 3px rgba(0, 0, 0, 0.1);
    z-index: 999;
    color: #333;
    display: flex;
    align-items: center;

    ul {
        width: 100%;
        height: 100%;
        display: flex;
        height: 50rem;

        li {
            flex: 1;
            text-align: center;
            line-height: 25rem;
            height: 50rem;
            font-size: 14rem;
            display: flex;
            flex-direction: column;

        }
    }
}
</style>
<template>
    <transition name="sidebar" appear>
    <div v-show="isShow" :style="color | setback" >
        <li v-for="item of hotList" :key="item.id">{{ item.nm }}</li>
    </div>
</transition>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

Vue.filter('setback', function (value) {
    return 'background-color: ' + value
} )
export default {
    props: {
        isShow: {
            type: Boolean,
            default: true
        },
        color: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            hotList: []
        }
    },
    mounted() {
        axios.get('/proxy-maoyan/api/mmdb/movie/v3/list/hot.json?ct=%E4%B8%8A%E6%B5%B7&ci=10&channelId=4')
            .then(res => {
                console.log(res.data);
                this.hotList = res.data.data.hot
            })
    }
}
</script>

<style scoped>
     /* 进场动画 */
     .sidebar-enter-active {
      animation: aaa 1s;
    }

    /* 出场动画 */
    .sidebar-leave-active {
      animation: aaa 1s reverse;
    }

    @keyframes aaa {
      0% {
        opacity: 0;
        transform: translateX(-100%);
      }

      100% {
        opacity: 1;
        transform: translateX(0%);
      }
    }
</style>
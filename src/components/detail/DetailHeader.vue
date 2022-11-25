<template>
    <div class="detail-header" v-scrollshow="show" :style="{display: show.isScrollShow ? 'none': 'block'}">
        <div @click="goback"><i class="iconfont icon-fangxiang-xiangzuo"></i></div>
        {{ name }}
    </div>
</template>

<script>
import Vue from 'vue'
Vue.directive('scrollshow', {
    inserted(el, binding) {
        if (binding.value.isScrollShow) {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > binding.value.toTop) {
                    el.style.display = 'block'
                } else {
                    el.style.display = 'none'
                }
            }
        }
    },
    unbind() {
        window.onscroll = null
    }
})
export default {
    props: {
        name: {
            type: String,
            default: 'name'
        },
        show: {
            type: Object,
            default: { isScrollShow: false, toTop: 50 }
        }
    },
    methods: {
        goback() {
            this.$router.back()
        }
    }
}
</script>

<style lang="scss" scoped>
.detail-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 375rem;
    height: 44rem;
    text-align: center;
    z-index: 999;
    background-color: #fff;
    font-size: 18rem;
    line-height: 44rem;
}

i {
    position: fixed;
    z-index: 999;
    left: 15rem;
}
</style>
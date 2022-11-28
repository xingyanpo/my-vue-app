<template>
    <div>
        <div ref="searchbar">
            <form action="/">
                <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
            </form>
        </div>
        <div class="box" v-if="value">
            <div class="wrapper" :style="{ height: height }">
                <ul>
                    <li v-for="item of cinemasComputed" :key="item.cinemaId" class="cinema-item">
                        <div class="item-left">
                            <p>{{ item.name }}</p>
                            <p>{{ item.address }}</p>
                        </div>
                        <div class="item-right">
                            <p>￥{{ item.lowPrice | priceFilter }}起</p>
                            <p>{{ item.longitude | killmaterFilter }}km</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import BetterScroll from 'better-scroll'
import Obj from '@/util/mixinObj'

Vue.filter('priceFilter', (data) => {
    return parseInt(data / 100)
})
Vue.filter('killmaterFilter', (data) => {
    return parseInt(data)
})
export default {
    mixins: [Obj],
    data() {
        return {
            height: '0px',
            value: ''
        }
    },
    mounted() {
        if (this.$store.state.cinemas.length === 0) {
            this.$store.dispatch('getCinemaData').then(res => {
                console.log('已加载完');
            })
        } else {
            console.log('缓存数据');
        }

        var getScrollHight = document.documentElement.clientHeight - this.$refs.searchbar.offsetHeight - document.querySelector('footer').offsetHeight + 'px'
        this.height = getScrollHight
    },
    updated() {
        let bs = new BetterScroll('.wrapper', {
            movable: true,
            zoom: true,
            scrollbar: true
        })
    },
    methods: {
        onSearch() {

        },
        onCancel() {
            this.$router.back()
        }
    },
    computed: {
        cinemasComputed () {
            return this.$store.state.cinemas.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
        }
    }
}
</script>

<style lang="scss" scoped>
.cinema-item {
    padding: 15rem;
    overflow: hidden;
    line-height: 1.5;

    .item-left {
        width: calc(100% - 70rem);
        float: left;

        p:first-child {
            font-size: 16rem;
            color: #333;
        }

        p:nth-child(2) {
            font-size: 12rem;
            color: #999;
        }
    }

    .item-right {
        width: 65rem;
        float: right;
        text-align: center;

        p:first-child {
            color: #ff5f16;
        }

        p:last-child {
            font-size: 10px;
            color: #999;
        }
    }
}

.wrapper {
    overflow: hidden;
    position: relative;
}
</style>
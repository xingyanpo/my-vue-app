<template>
    <div class="box">
        <van-nav-bar title="影院" ref="cinemaTabbar" @click-left="handleLeft" @click-right="handleRight">
            <template #left>
                {{ $store.state.cityName }}
                <van-icon name="arrow-down" color="black" />
            </template>
            <template #right>
                <van-icon name="search" size="24" color="black" />
            </template>
        </van-nav-bar>
        <div class="wrapper" :style="{ height: height }">
            <ul>
                <li v-for="item of $store.state.cinemas" :key="item.cinemaId" class="cinema-item">
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
</template>

<script>
import Vue from 'vue'
import BetterScroll from 'better-scroll'

Vue.filter('priceFilter', (data) => {
    return parseInt(data / 100)
})
Vue.filter('killmaterFilter', (data) => {
    return parseInt(data)
})
export default {
    data() {
        return {
            height: '0px'
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

        var getScrollHight = document.documentElement.clientHeight - this.$refs.cinemaTabbar.$el.offsetHeight - document.querySelector('footer').offsetHeight + 'px'
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
        handleLeft() {
            this.$router.push('/city')
            this.$store.commit('clearCinemas')
        },
        handleRight() {
            this.$router.push('/cinemas/search')
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
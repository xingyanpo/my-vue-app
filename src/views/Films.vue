<template>
    <div>
        <film-swiper :key="filmList.length" class="film-swiper">
            <film-swiper-item class="film-swiper-item" v-for="item of filmList" :key="item.filmId"><img :src="item.poster" alt=""></film-swiper-item>
        </film-swiper>
        <film-header></film-header>
        <router-view></router-view>
    </div>
</template>

<script>
import filmSwiper from '@/components/film/FilmSwiper'
import filmSwiperItem from '@/components/film/FilmSwiperItem'
import filmHeader from '@/components/film/FilmHeader'
import axios from 'axios'
export default {
    components: { filmSwiper, filmSwiperItem,  filmHeader},
    data() {
        return {
            filmList: []
        }
    },
    mounted() {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=6221678',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16690934605459620692754433","bc":"310100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            console.log(res.data.data.films);
            this.filmList = res.data.data.films
        })
    }
}
</script>

<style lang="scss">
    .film-swiper {
        width: 100%;
        .film-swiper-item {
            height: 100%;
            object-fit: cover;
        }
    }
</style>
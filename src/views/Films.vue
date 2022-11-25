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
import http from '@/util/http'
export default {
    components: { filmSwiper, filmSwiperItem,  filmHeader},
    data() {
        return {
            filmList: []
        }
    },
    mounted() {
        http({
            url: '/gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=6221678',
            headers: {
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
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
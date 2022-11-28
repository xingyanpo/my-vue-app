<template>
    <div v-if="filmInfo" class="box">
        <detail-header :name="filmInfo.name" :show="{isScrollShow: true, toTop: 100}"></detail-header>
        <div class="detail-banner" :style="{ backgroundImage: `url(${filmInfo.poster})` }"></div>
        <div class="detail-desc">
            <p>{{ filmInfo.name }}<span>{{ filmInfo.item.name }}</span><span>{{ filmInfo.grade }}分</span></p>
            <p>{{ filmInfo.category }}</p>
            <p>{{ filmInfo.premiereAt | timeFilter }} 上映</p>
            <p>{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</p>
            <p :class="isHidden ? 'synopsis' : ''" style="line-height: 15rem">{{ filmInfo.synopsis }}</p>
            <div @click="isShowDesc"><i class="iconfont"
                    :class="isHidden ? 'icon-fangxiang-xiangxia' : 'icon-fangxiang-xiangshang'"></i></div>
        </div>
        <div class="detail-actor">
            <p>演职人员</p>
            <detail-swiper :name="'swiperavatar'" :show-number="3.8" :padding="10"  class="photo-wrap">
                <detail-swiper-item v-for="item of filmInfo.actors" :key="item.name" class="avatar-item">
                    <div class="avatar" :style="{ backgroundImage: `url(${item.avatarAddress})` }"></div>
                    <div class="avatar-text">
                        <p>{{ item.name }}</p>
                        <P>{{ item.role }}</P>
                    </div>
                </detail-swiper-item>
            </detail-swiper>
        </div>
        <div class="detail-actor">
            <p>剧照<span style="float:right;color: #666;font-size: 14rem;" @click="handlePreview(0)">全部({{photoNumber}})</span></p>
            <detail-swiper :name="'swiperphotos'" :show-number="2" :padding="10" class="photo-wrap">
                <detail-swiper-item v-for="(item,index) in filmInfo.photos" :key="item" class="avatar-item">
                    <div class="photo" :style="{ backgroundImage: `url(${item})` }" @click="handlePreview(index)"></div>
                </detail-swiper-item>
            </detail-swiper>
        </div>
        
    </div>
</template>

<script>
import http from '@/util/http';
import moment from 'moment';
import Vue from 'vue'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailSwiperItem from '@/components/detail/DetailSwiperItem'
import detailHeader from '@/components/detail/DetailHeader'
import { ImagePreview } from 'vant';
import Obj from '@/util/mixinObj'

Vue.filter('timeFilter', (data) => {
    return moment(data * 1000).format('YYYY-MM-DD')
})
export default {
    mixins: [Obj],
    data() {
        return {
            filmInfo: null,
            isHidden: false
        }
    },
    components: {
        detailSwiper,
        detailSwiperItem,
        detailHeader
    },
    created() {
        // console.log('created', this.$route.params.id); // route 当前匹配的路由
        http({
            url: `/gateway?filmId=${this.$route.params.id}&k=1622720`,
            headers: {
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res => {
            this.filmInfo = res.data.data.film
        })
    },
    methods: {
        isShowDesc() {
            this.isHidden = !this.isHidden
        },
        handlePreview(index) {
            ImagePreview({
                images: this.filmInfo.photos,
                startPosition:index,
                closeable: true
            });
        }
    },
    computed: {
        photoNumber () {
            return this.filmInfo.photos.length
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%
}

.detail-banner {
    width: 100%;
    height: 210rem;
    background-position: center;
    background-size: cover;
}

.detail-desc {
    width: 100%;
    padding: 15rem 15rem 5rem 15rem;
    box-sizing: border-box;
    background-color: #FFF;

    p:first-child {
        font-size: 16rem;
        padding-bottom: 5rem;

        span:first-child {
            font-size: 14rem;
            background-color: #DDD;
            color: #FFF;
            padding: 0 3px;
            border-radius: 3px;
            margin-left: 3px;
        }

        span:last-child {
            font-style: italic;
            float: right;
            color: #ffb232;
        }
    }

    p:not(:first-child) {
        font-size: 12rem;
        line-height: 1.5;
        color: #999;
    }

    p:last-child {
        padding-top: 15rem;
    }

    div {
        text-align: center;
        padding: 5px 0 0 0;
        box-sizing: border-box;
    }

    border-bottom: #EEE 10rem solid;
}

.synopsis {
    height: 30rem;
    overflow: hidden;
}

.detail-actor {
    width: 100%;
    p {
        font-size: 18rem;
        padding: 15rem;
    }

    .avatar {
        width: 100%;
        aspect-ratio: 1/1;
        background-position: center;
        background-size: cover;
    }

    border-bottom: #EEE 10rem solid;
}

.avatar-item {
    text-align: center;
    line-height: 1.5;

    p {
        font-size: 12rem;
        color: #999;
        padding: 0;
    }
    .avatar-text {
        padding: 8rem 0;
    }
}
.photo-wrap {
    padding:10rem;
    box-sizing: border-box;
}
.photo {
        width: 100%;
        aspect-ratio: 5/3;
        background-position: center;
        background-size: cover;
    }
</style>
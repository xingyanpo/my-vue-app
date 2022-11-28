<template>
    <van-list class="box" v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad" :immediate-check="false">
        <van-cell v-for="item in list" :key="item.id" @click="handleToDetail(item.filmId)">
            <div class="left">
                <img :src="item.poster" alt="">
            </div>
            <div class="right">
                <p>{{ item.name }}<span>{{ item.item.name }}</span></p>
                <p>观众评分：<span>{{ item.grade }}</span></p>
                <p>主演：{{ item.actors | actotrFilter }}</p>
                <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
            </div>
        </van-cell>
    </van-list>
</template>

<script>
import http from '@/util/http';
import Vue from 'vue'

Vue.filter('actotrFilter', (data) => {
    if (!data) return '暂无主演'
    return data.map(item => item.name).join(' ')
})
export default {
    data() {
        return {
            list: [],
            curren: 1,
            loading: false,
            finished: false,
            total: 0
        }
    },
    mounted() {
        http({
            url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=7851840`,
            headers: {
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            this.list = res.data.data.films
            this.total = res.data.data.total
        })
    },
    methods: {
        handleToDetail(id) {
            // location.href = '#/detail'
            //  1-通过路径跳转
            // this.$router.push(`/detail/${id}`)
            // 2-通过命名路由跳转
            this.$router.push({
                name: 'Detail',
                params: {
                    id
                }
            })
        },
        onLoad () {
            if (this.list.length === this.total) {
                this.finished = true
                return
            }
            console.log('加载中...');
            this.curren ++ 
            http({
            url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.curren}&pageSize=10&type=1&k=7851840`,
            headers: {
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            this.list = [...this.list,...res.data.data.films]
            this.loading = false
        })
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    li {
        overflow: hidden;
        padding: 15rem 15rem 0;
        border-bottom: 1px solid #EEE;
    }
}

.left {
    width: 66rem;
    float: left;

    img {
        width: 100%;
    }
}

.right {
    float: left;
    padding: 0 10px;
    font-size: 16px;
    max-width: calc(100% - 132rem);
    padding-bottom: 15rem;

    p {
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.5;
    }

    p:first-child {
        span {
            color: #FFF;
            background-color: #CCC;
            padding: 0 5px;
            border-radius: 3px;
            margin-left: 3px;
            font-size: 12px;
        }
    }

    p:nth-child(2) {
        color: #999;
        font-size: 14px;

        span {
            color: #ffb232;
        }
    }

    p:nth-child(3),
    p:nth-child(4) {
        color: #999;
        font-size: 14px;
    }
}
</style>
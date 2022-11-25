<template>
    <div class="box">
        <li v-for="item in list" :key="item.id" @click="handleToDetail(item.id)">
            <div class="left">
                <img :src="item.img" alt="">
            </div>
            <div class="right">
                {{ item.nm }}
            </div>
        </li>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        axios.get('/proxy-maoyan/api/mmdb/movie/v3/list/hot.json?ct=%E4%B8%8A%E6%B5%B7&ci=10&channelId=4')
            .then(res => {
                console.log(res.data.data.hot);
                this.list = res.data.data.hot
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .box {li{
        overflow: hidden;
    }}
    .left {
        width: 40%;
        float: left;
        img{
            width: 100%;
        }
    }
    .right {
        width:60%;
        float: right;
    }
</style>
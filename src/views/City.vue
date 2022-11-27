<template>
  <div>
    <div v-for="item of cityList" :key="item.type" >
      <van-index-bar :index-list="cityComputed">
        <van-index-anchor :index="item.type" />
        <van-cell :title="data.name" v-for="data of item.list" :key="data.cityId"/>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";

export default {
  data() {
    return {
      cityList: [],
    };
  },
  methods: {
    cityFrmat(city) {
      let wordList = [];
      for (let i = 65; i < 91; i++) {
        wordList.push(String.fromCharCode(i));
      }
      var cities = [];
      wordList.forEach((item) => {
        cities.push({
          type: item,
          list: city.filter(
            (data) => data.pinyin.substring(0, 1).toUpperCase() === item
          ),
        });
      });
      this.cityList = cities.filter(item => item.list.length!==0)
    }
  },
  mounted() {
    http({
      url: "gateway?k=4390330",
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      this.cityFrmat(res.data.data.cities);
    });
  },
  computed: {
    cityComputed () {
      return this.cityList.map(item => item.type)
    }
  }
};
</script>

<style lang="scss">
  
</style>
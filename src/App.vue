<template>
  <div class="box">
    <router-view></router-view>
    <section style="margin-bottom:60rem;">
      <tabbar :router-link="routerLink"></tabbar>
    </section>
  </div>
</template>

<script>
import tabbar from '@/components/Tabbar'
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

export default {
  components: {tabbar},
  data() {
    return {
      routerLink: [{
        link: '/films',
        name: '电影',
        icon: 'icon-dianyingpiao'
      }, {
        link: '/cinemas',
        name: '影院',
        icon: 'icon-yingyuan'
      },{
        link: '/center',
        name: '我的',
        icon: 'icon-wode'
      }]
    }
  }
}
</script>

<style>
.bottom-bar-active {
  color:red;
}
.box {
  width:375rem;
}
*{
  margin: 0;
  padding: 0;
};
html,body {
  height: 100%;
};
</style>
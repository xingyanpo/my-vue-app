<template>
  <div class="box">
    <tabbar :router-link="routerLink"></tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from '@/components/Tabbar'
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
        icon: 'icon-wode'
      },{
        link: '/center',
        name: '我的',
        icon: 'icon-yingyuan'
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
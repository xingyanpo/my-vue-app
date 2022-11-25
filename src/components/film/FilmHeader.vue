<template>
    <div class="film-bar">
        <router-link v-for="item in filmLink" :key="item.link" :to="item.link" custom v-slot="{ navigate, isActive }">
            <li @click="navigate" :class="isActive ? 'film-bar-active' : ''">
                <span>{{ item.name }}</span>
            </li>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filmLink: [
                {
                    name: '正在热映',
                    link: '/films/nowplaying'
                },
                {
                    name: '即将上映',
                    link: '/films/comingsoon'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.film-bar {
    display: flex;
    height: 49rem;

    li {
        flex: 1;
        text-align: center;
        line-height: 49rem;

    }
}

.film-bar-active {
    color: #ff4b00;
    span {
        border-bottom: 2px solid #ff4b00;
        line-height: 49rem;
        height: 49rem;
    }
}
.film-bar {
    position: sticky; top: 0px;
    background-color: #FFF;
    z-index: 999;
}
</style>
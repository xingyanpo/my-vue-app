<template>
    <div class="swiper" :class="name">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'

export default {
    props: {
        name: {
            type: String,
            default: 'swiper'
        },
        showNumber: {
            type: Number,
            default: 3
        },
        padding: Number,
        default: 30
    },
    mounted() {
        new Swiper(`.${this.name}`, {
            slidesPerView: this.showNumber,
            spaceBetween: this.padding,
            freeMode: true,
        })
    }
}
</script>

<style scoped>
.swiper {height: auto;}
</style>
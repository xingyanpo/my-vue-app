export default {
    created () {
        this.$store.commit('isShowTabbar', false)
    },
    destroyed () {
        this.$store.commit('isShowTabbar', true)
    }
}
<template>
    <div>
        登录
        <button @click="login">登录</button>
    </div>
</template>

<script>
    export default {
        methods: {
            login () {
                localStorage.setItem('token', 'hhh')
                // this.$route.back // 返回
                this.$router.push(this.$route.query.redirect || '/center')
            }
        }
    }
</script>
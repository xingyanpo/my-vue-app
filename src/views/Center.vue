<template>
    <div>
        center
        <button @click="logout">退出登录</button>
    </div>
</template>

<script>
    export default {
        methods: {
            logout () {
                localStorage.removeItem('token')
                this.$router.push('/login')
            }
        }
    }
</script>
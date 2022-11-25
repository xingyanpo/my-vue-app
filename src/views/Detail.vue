<template>
    <div>
        detail
    </div>
</template>

<script>
    export default {
        created () {
            console.log('created', this.$route.params.id); // route 当前匹配的路由
        }
    }
</script>
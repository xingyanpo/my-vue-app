<template>
    <div>
        <slot></slot>
        <button @click="handleSideChangeColor">变色</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            color: 'red'
        }
    },
    methods: {
        handleSideChangeColor() {
           this.color =  this.color === 'red' ? 'yellow' : 'red'
           this.$emit('event', this.color)
        }
    }
}
</script>

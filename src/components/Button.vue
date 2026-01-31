<script setup lang="ts">
const handleClick=()=>{
    alert('已点击')
}
const data={
    name:'wuxin'
}
const props=defineProps(['bgColor','color'])
</script>

<template>
    <button @click="handleClick" :style="{backgroundColor:bgColor,color:color}">
        <span><slot></slot></span>
    </button>
    <div><slot name="defualt" :data="data"></slot></div>
</template>

<style lang="scss">

</style>
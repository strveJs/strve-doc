<template>
  <ul>
      <li v-for="item in 2" :key="item">{{item}}</li>
  </ul>
</template>

<script>
export default {
    name:'demo3'
}
</script>
<style scoped>
ul{
    border: 1px solid #ccc;
    padding: 10px;
}
li{
    list-style: none;
}
</style>
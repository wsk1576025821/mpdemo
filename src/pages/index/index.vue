<template>
  <div class="container">
    <div class="btn" @click="handleClick">click me</div>
    <i-button type="primary">222</i-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },

  components: {
  },

  methods: {
    handleClick(){
      console.log('111');
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
.container{
  .btn{
    width: 100px;
    height: 50px;
    background: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

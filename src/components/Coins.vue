<template>
  <div class="coins">
    <coin :angele="angeles[0]" :onTransitionEnd="true" @TransitionEnd="handleTransitionEnd"/>
    <coin :angele="angeles[1]" :onTransitionEnd="null"/>
    <coin :angele="angeles[2]" :onTransitionEnd="null"/>
  </div>
</template>

<script>
import Coin from './Coin.vue'


export default {
  data(){
    return {}

  },
  methods: {
    handleTransitionEnd(){
      this.$emit('TransitionEnd')
      // console.log('Coins收到了动画结束事件');
    }
  },
  props:{
    angeles:{
      type: Array,
      required: true
    },

  },
  components:{
    'coin': Coin,
  },
  // watch:{
  //   angeles:{
  //     handler(val){
  //       console.log(this.angeles);
  //       console.log('----')
  //       console.log(val);
  //     }
  //   }
  // }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.coins{
  width:50%;
	display:flex;
	flex-direction:row;
	margin-left:auto;
	margin-right:auto;
	margin-top:3em;
	margin-bottom:3em;
}

</style>

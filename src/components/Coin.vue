<template lang="">
  <div class="coin" :style="styleObj" @transitionend.stop.prevent="handleTransitionEnd">
    
    <div class='head'/>
    <div class='tail'/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      styleObj: {
        transform: 'rotateY(0deg)'
      },
    }
  },
  props:{
    angele:{
      type: Number,
      required: true
    },
    onTransitionEnd:{
      type: Boolean,
      required: false
    }
  },
  watch:{
    angele:{
      handler(val){
        this.styleObj.transform = 'rotateY('+ val +'deg)';
      }
    }
  },
  methods: {
    handleTransitionEnd(){
      if(this.onTransitionEnd){
        this.$emit('TransitionEnd')
        // console.log('动画结束');
      }
    }
  },

}
</script>
<style lang="less" scoped>

.coin{
  border-radius:50%;
  width: 5em;
	height: 5em;
  margin-left:auto;
	margin-right:auto;
  // margin-top:2em;
  position:relative;
  transition:all 1s;
  transform-style:preserve-3d;
  transform-origin:50% 50% 0.1em;
	-webkit-transform-style:preserve-3d;
	-webkit-transform-origin:50% 50% 0.1em;
	// animation: spin 1s linear infinite;

	// 	@keyframes spin{
	// 	0%{
	// 		transform: rotateY(0deg);
	// 	}
	// 	100%{
	// 		transform: rotateY(360deg);
	// 	}
	// }
}

.head{
  height: 5em;
	width: 5em;
	position:absolute;
  background-image: url(../assets/img/head.png);
  background-position:50% 50%;
	background-size:contain;
}

.tail{
  height: 5em;
	width: 5em;
	position:absolute;
  background-image: url(../assets/img/tail.png);
  background-position:50% 50%;
	background-size:contain;
	transform:translateZ(-0.1em);
}
</style>

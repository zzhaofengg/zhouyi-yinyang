<template lang="">
  <div class="gua-line">
    <div :class="guaBarClass">
      <div :class="guaSpaceClass"/>
    </div>
    <div :class="guaChangeClass"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isNone: true,
      isYang: false,
      isChange: false,
      changeChar: ''
    }
  },
  props:{
    gua:{
      type:Number,
      require: true
    }
  },
  watch:{
    gua:{
      handler(val){
        this.isNone = (val === -1);
        this.isYang = (val > 1);
        if((val === 0) || (val === 3)){
          this.isChange = true;
          if(this.isYang){
            this.changeChar = '○';
          }else{
            this.changeChar = '×';
          }
        }
        
      }
    }
  },
  computed:{
    guaBarClass: function(){
      return{
        'gua-bar-yin': !this.isNone && !this.isYang,
        'gua-bar-yang': !this.isNone && this.isYang,
      }
    },
    guaSpaceClass: function(){
      return{
        'gua-space-yin': !this.isNone && !this.isYang,
        'gua-space-yang': !this.isNone && this.isYang,
        'gua-change-none': !this.isChange,
      }
    },
    guaChangeClass: function(){
      return{
        'gua-change-none': !this.isChange,
        'gua-change-yin': this.isChange && !this.isYang,
        'gua-change-yang': this.isChange && this.isYang,
      }
    }
  }
}
</script>
<style lang="less" scoped>
@guaYinColor:red;
@guaYangColor:blue;
@guaBgColor:white;
@barHeight:8%;
.gua-line{
  margin: @barHeight;
  height: @barHeight;
  display: flex;
  flex-direction: column;
}

.gua-bar {
  height: 100%;
  width: 100%;
}
.gua-space-yin {
  background-color: @guaBgColor;
  height:100%;
  width:30%;
  margin-left: auto;
  margin-right: auto;
}
.gua-space-yang:extend(.gua-space-yin) {
  display: none;
}

.gua-bar-yin:extend(.gua-bar){
  background-color: @guaYinColor;
}
.gua-bar-yang:extend(.gua-bar){
  background-color: @guaYangColor;
}

// .gua-change-yang::after{
//   width: 10px;
//   content: '○';
// }

// .gua-change-yin{
//   width: 10px;
//   content: '×';
// }



// .gua-change-yin:extend(.gua-change) {
//   *background-color: green;
// }

</style>

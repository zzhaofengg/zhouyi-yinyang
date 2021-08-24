<template lang="">
  <div class="gua-diagram">
        卦象
    <div class="gua-diagram-body">
      <!-- 在这个里面循环加具体卦象组件 -->
      <guabar v-for="(gua,index) in diagrams" :gua="gua" :key="index"></guabar>
    </div>
  </div>
</template>
<script>
import Guabar from './GuaBar.vue'
export default {
  data() {
    return {
      guaNum: 6,
      diagrams: []
    }
  },
  props:{
    guas:{
      type: Array,
      required: true
    }
  },
  components:{
    'guabar':Guabar
  },
  watch:{
    guas:{
      immediate:true,
      handler(val){
        console.log(val.length);
        // const self = this;
        const len = val.length;
        const spaceNum = this.guaNum-len;
        //空卦占位
        for (let i = 0; i < spaceNum; i++) {
          this.$set(this.diagrams,i,-1)
        }
        //倒序加入八卦。
        const guas = val.concat();
        guas.reverse();
        console.log('guas reverse: ' + guas);
        guas.forEach((value, index) => {
          this.$set(this.diagrams,(index+spaceNum),value);
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@guaBgColor:white;
.gua-diagram {
  width:10em;
  height:15em;
  font-size: 15px;
  font-weight:bold;
  border-radius: 20px;
  background-color: @guaBgColor;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  box-shadow: 0px 0px 10px 1px rgb(199 62 58 / 70%);
}

.gua-diagram-body {
  width:100%;
  height:90%;
}
</style>

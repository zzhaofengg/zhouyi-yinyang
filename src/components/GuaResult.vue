<template lang="">
  <div class="gua-result">
    结果: 第{{index}}卦 {{name}}卦({{name2}}),{{changeGua}}
    <br/>
    <br/>
    <a :href="link" target="_blank" rel="noopener noreferrer">点此查找解释</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  props:{
    index: Number,
    name: String,
    name2: String,
    desc: String,
    desc2: String,
    change: Array
  },
  computed:{
    changeGua: function(){
      let res = null;
      if(this.change.length === 0){
        res = '无变爻';
      }else{
        res = '变爻:' + this.change;
      }
      return res;
    },
    link: function(){
      return 'https://www.baidu.com/s?wd=(周易第' + this.index + '卦_' + this.name + '卦_' + this.name2 + '_' + this.desc + '_' + this.desc2 + ')';
    }
  }
}
</script>
<style lang="less" scoped>
.gua-result {
  border: 2px black solid;
  max-width: 20em;
  margin-left: auto;
  margin-right: auto;
}
</style>

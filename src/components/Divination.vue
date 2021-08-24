<template>
  <div class="divination">
    <coins :angeles="angeles" @TransitionEnd="handleTransitionEnd"/>
    
    <button class="flipButton" @click.stop.prevent="filpCoins()" :disabled="filpDisabled">摇卦</button>
    <button class="resetButton" @click="refresh()" >逆天改命</button>

    <guadiagram :guas="guas"/>
    <guaresult v-if="isShowRes" :index="result.index" :name="result.name" :name2="result.name2" :desc="result.gua" :desc2="result.gua2" :change="result.change"/>
    <guides></guides>
  </div>
</template>

<script>
import Coins from './Coins.vue'
import Guide from './Guide.vue'
import GuaDiagram from './GuaDiagram.vue'
import GuaResult from './GuaResult.vue'

export default {
  data(){
    return {
      //卦象结果数组
      guas:[],
      //硬币旋转角度
      angeles:[0, 0, 0],
      filpDisabled: false,
      flipDeg: 4320,
      guaList:[],
      guaMap:[],
      guaDict: ['坤', '震', '坎', '兑', '艮', '离', '巽', '乾'],
      guaDict2: ['地', '雷', '水', '泽', '山', '火', '风', '天'],
      result:{},
      isShowRes: false
    };
  },
  created(){
    this.guaList = require('../assets/json/GuaList');
    this.guaMap = require('../assets/json/GuaMap');
  },
  methods: {
    filpCoins(){
      const self = this;
      // console.log('guas: ' + self.guas);
      self.filpDisabled = true;
      const flipDeg = self.flipDeg;
      //生成每个硬币的旋转角度
      self.angeles.forEach((value, index) => {
        const rnd = Math.random();
        console.log('random: ' + rnd);
        const totalDeg = value + flipDeg + (rnd > 0.5 ? 180 : 0);
        this.$set(self.angeles, index, totalDeg);
        // self.angeles[index] = totalDeg;
      });
      // console.log(self.angeles);

    },
    handleTransitionEnd(){
      const self = this;
      const guas = self.guas;
      const newGua = self.getGua();
      this.$set(self.guas, self.guas.length, newGua);
      console.log('guas: ' + guas);
      if(self.guas.length < 6){
        this.filpDisabled = false;
      }else{
        this.result = this.getResult();
        console.log('end');
      }
      console.log('第' + self.guas.length + '次摇卦结束');
    },
    getGua() {
      let yangNum = 0;
      this.angeles.forEach((value) => {
        // eslint unused:false;
        yangNum += (value % 360) > 0 ? 0 : 1;
      });
      return yangNum;
    },
    refresh(){
      location.reload();
    },
    getResult(){
      const self = this;
      //变卦
      const changeGuas = [];
      const guas = self.guas;

      if (guas.length < 6) {
        return null;
      }
      guas.forEach((value, index) => {
        if (value === 0 || value === 3) {
          changeGuas.push(index + 1);
        }
      });
      //记录变卦
      console.log('change guas: ' + changeGuas);
      // 卦的结果： 第X卦 X卦 XX卦 上X下X X上X下
      // 计算卦的索引，111对应乾卦。000对应坤卦，索引转为10进制。
      const upGuaIndex = (guas[5] > 1 ? 4 : 0) + (guas[4] > 1 ? 2 : 0) + (guas[3] > 1 ? 1 : 0);
      const downGuaIndex = (guas[2] > 1 ? 4 : 0) + (guas[1] > 1 ? 2 : 0) + (guas[0] > 1 ? 1 : 0);
      const guaIndex = self.guaMap[upGuaIndex][downGuaIndex];
      const guaName = self.guaList[guaIndex - 1];
      let guaName2 = null;
      if (upGuaIndex === downGuaIndex) {
        // 上下卦相同，格式为X为X
        guaName2 = self.guaDict[upGuaIndex] + '为' + self.guaDict2[upGuaIndex];
      } else {
        guaName2 = self.guaDict2[upGuaIndex] + self.guaDict2[downGuaIndex] + guaName;
      }

      console.log('upGuaIndex: ' + upGuaIndex + ', downGuaIndex: ' + downGuaIndex);

      const guaDiscription = self.guaDict[upGuaIndex] + '上' + self.guaDict[downGuaIndex] + '下';
      const guaDiscription2 = '上' + self.guaDict[upGuaIndex] + '下' + self.guaDict[downGuaIndex];
      console.log(guaDiscription + ' 变卦: ' + changeGuas);
      this.isShowRes = true;
      return {
        index: guaIndex,
        name: guaName,
        name2: guaName2,
        gua: guaDiscription,
        gua2: guaDiscription2,
        change: changeGuas
      };
    }
  },
  components:{
    'coins': Coins,
    'guides': Guide,
    'guadiagram': GuaDiagram,
    'guaresult' : GuaResult
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.divination{
  text-align: center;
}

</style>

<template>
    <div class="valBoxs">
        <div class="valGroup" v-for="(itemRow,indexRow) in checkShowInputs" :key="indexRow">
            <div class="valName">{{itemRow.name}}</div>
            <div class="vals">
                <div class="valBox" v-for="(itemCol,indexCol) in itemRow.cols" :key="indexCol">
                    <span :class="itemCol.flag==0?'fail':'pass'">{{itemCol.value}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "checkVals",
  props: ["detailsData"],
  data() {
    return {
      checkShowInputs: []
    };
  },
  mounted() {
    this.detailsNotNull_init();
  },
  methods: {
    detailsNotNull_init() {
      let num = 0;
      let row = 1;
      let col = 0;
      for (let item of this.detailsData) {
        if (item.xpos != num) {
          num++;
          row++;
        }
      }
      col = this.detailsData.length / row;
      let index = 0;
      for (let i = 0; i < row; i++) {
        let rowArr = {
          name: "位置" + (i + 1),
          cols: []
        };
        for (let t = 0; t < col; t++) {
          let detail = this.detailsData[index];
          let obj = {
            xpos: detail.xpos,
            ypos: detail.ypos,
            value: detail.value,
            artificialFlag: detail.artificialFlag,
            flag: detail.flag,
            noValue: detail.value != undefined ? true : false
          };
          rowArr.cols.push(obj);
          index++;
        }
        this.checkShowInputs.push(rowArr);
      }
    }
  }
};
</script>


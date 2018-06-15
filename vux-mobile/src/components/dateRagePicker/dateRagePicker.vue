<template>
  <div class="dateRagePicker">
    <!-- <div class="group" @click="beginTouch">
            <label>开始时间</label>
            <input type="text" v-model="beginDateShow" disabled>
        </div> -->
    <div @click="beginTouch()">
      <mt-cell title="开始时间" is-link>
        <input type="text" v-model="beginDateShow" disabled>
      </mt-cell>
    </div>
    <div @click="endTouch">
      <mt-cell title="结束时间" is-link>
        <input type="text" v-model="endDateShow" disabled>
      </mt-cell>
    </div>
    <mt-datetime-picker @confirm="beginChange" ref="beginPicker" v-model="finaDate[0]" type="datetime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" hour-format="{value} 时" minute-format="{value} 分">
    </mt-datetime-picker>
    <mt-datetime-picker @confirm="endChange" ref="endPicker" v-model="finaDate[1]" type="datetime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" hour-format="{value} 时" minute-format="{value} 分">
    </mt-datetime-picker>
  </div>
</template>

<script>
import { $dataFormat } from "common/filiter/index.js";
export default {
  name: "dateRagePicker",
  props: {
    value: {
      type: Array
    },
    fmt: {
      type: String
    }
  },
  data() {
    return {
      openPop: false,
      finaDate: [this.value[0], this.value[1]]
    };
  },
  mounted() {},
  computed: {
    beginDateShow: {
      get: function() {
        return $dataFormat(this.finaDate[0], "yyyy-MM-dd hh:mm");
      }
    },
    endDateShow: {
      get: function() {
        return $dataFormat(this.finaDate[1], "yyyy-MM-dd hh:mm");
      }
    }
  },
  methods: {
    beginChange(e) {
      this.finaDate[0] = e;
      this.$emit("input", this.finaDate);
    },
    endChange(e) {
      this.finaDate[1] = e;
    },
    beginTouch() {
      this.$refs.beginPicker.open();
    },
    endTouch() {
      this.$refs.endPicker.open();
    }
  }
};
</script>


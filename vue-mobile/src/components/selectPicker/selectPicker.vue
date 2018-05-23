<template>
  <div class="selectPicker">
    <div class="group" @click="pickerShow=!pickerShow">
      <label>下拉选择</label>
    </div>
    <mt-popup v-model="pickerShow" position="bottom" class="pickerShower">
      <mt-picker :slots="slots" @change="selectChange"></mt-picker>
    </mt-popup>

  </div>
</template>

<script>
export default {
  name: "selectPicker",
  props: {
    title: {
      type: String
    },
    option: {
      type: Array
    }
  },
  data() {
    return {
      pickerShow: false,
      slots: [
        {
          values: ["年假", "事假", "病假", "婚假", "其他"],
          valuekey: [1, 2, 3, 4, 5]
        }
      ]
    };
  },
  mounted() {},
  computed: {},
  methods: {
    selectChange(e, val, key) {
      console.log(e);
    }
  }
};
</script>


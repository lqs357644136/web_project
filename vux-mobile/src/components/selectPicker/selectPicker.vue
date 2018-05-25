<template>
  <div class="selectPicker">
    <div  @click="pickerShow=!pickerShow">
      <mt-cell title="下拉选择" is-link>
        <input type="text"  disabled>
      </mt-cell>
    </div>
    <mt-popup v-model="pickerShow" :modal="true" position="bottom" class="pickerShower">
      <mt-picker :slots="slots" :defaultIndex="0" valueKey="title" @change="selectChange"></mt-picker>
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
          values: this.option,
        }
      ]
    };
  },
  mounted() {},
  computed: {},
  methods: {
    selectChange(e, val, key) {
      console.log(val);
    }
  }
};
</script>


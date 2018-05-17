<template>
    <div class="selectPicker">
        <div class="group">
            <label>下拉选择</label>
        </div>
        <div class="mask">
            <mt-picker :slots="slots" @change="selectChange"></mt-picker>
        </div>
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
      select: "",
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
      selectChange(e,val,key){
          console.log(e)
      }
  }
};
</script>


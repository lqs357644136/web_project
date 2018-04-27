<template>
    <div class="kanban-title">
        <span class="logo">
            <img v-if="logo" :src="logo" alt="logo">
        </span>
        <span class="title">{{title}}</span>
        <span class="right">
            <span v-if="right">{{right}}</span>
        </span>
    </div>
</template>

<script>
export default {
  name: "kanbantitle",
  props: ["logo", "title", "right"],
  data() {
    return {};
  }
};
</script>


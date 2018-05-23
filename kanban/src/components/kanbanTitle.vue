<template>
    <div class="kanban-title">
        <span class="logo">
            <img v-if="logo" :src="logo" alt="logo">
        </span>
        <span v-if="title" class="title">{{title}}</span>
        <span v-if="titleMain" class="titleMain">
            <b>{{titleMain.text01}}</b>  
            <b>{{titleMain.text02}}</b>  
        </span>
        <span v-if="titleColor" class="title">
            <span class="name">{{titleColor.name}}</span>{{titleColor.main}}
        </span>
        <span class="right">
            <span v-if="right">{{right}}</span>
        </span>
    </div>
</template>

<script>
export default {
  name: "kanbantitle",
  props: ["logo", "title", "right","titleMain","titleColor"],
  data() {
    return {};
  }
};
</script>


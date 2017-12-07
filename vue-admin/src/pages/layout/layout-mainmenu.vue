<template>

  <!-- 页面主体 -->
  <el-main class="menu-main">

    <!-- tab菜单选项 -->
    <el-tabs class="main-tabs" v-model="tabsActiveName" type="card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="(item, index) in tabPanes" :key="item.name" :label="item.title" :name="item.name">
        {{item.content}}
      </el-tab-pane>
    </el-tabs>

    <!-- 模块主体 -->
    <transition name="fade" mode="out-in">
      <keep-alive >
        <router-view></router-view>
      </keep-alive>
    </transition>

  </el-main>

</template>

<script>
export default {
  data() {
    return {
      tabsActiveName: "1",
      tabPanes: [
        {
          title: "Tab 1",
          name: "1",
        },
        {
          title: "Tab 2",
          name: "2",
        }
      ],
      tabPanesIndex: 2
    };
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabPanesIndex + "";
      this.tabPanes.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.tabsActiveName = newTabName;
    },
    //删除tab标签
    removeTab(targetName) {
      let tabs = this.tabPanes;
      let activeName = this.tabsActiveName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.tabsActiveName = activeName;
      //更新tabPanes数据
      this.tabPanes = tabs.filter(tab => {
        console.log(tab);
        tab.name !== targetName;
      });
    }
  }
};
</script>

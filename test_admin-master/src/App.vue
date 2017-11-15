<template>
    <div class="layout">
        <Row type="flex" class="layout_row">
            <Col span="5" class="layout-menu-left">
                <Menu accordion theme="dark" width="auto" :open-names="['1']" @on-select="openView" style="background:#404040;">
                    <div class="layout-logo-left">
                        <img src="./assets/headerimg.png">
                    </div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            客户管理
                        </template>
                        <MenuItem name="customer_list">客户列表</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            监控管理
                        </template>
                        <MenuItem name="monitor">系统监控</MenuItem>
                        <MenuItem name="table">客户日志</MenuItem>
                        <MenuItem name="2-2">接口日志</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            系统管理
                        </template>
                        <MenuItem name="3-1">角色管理</MenuItem>
                        <MenuItem name="3-2">用户管理</MenuItem>
                        <MenuItem name="3-3">字典管理</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="19" class="conten_main">
                <Row class="layout-header">
                    <Col span="20">实地客户主数据中心系统</Col>
                    <Col span="4" class="userInfo">
                        <Icon type="person" size="18"></Icon>
                        <span class="textName">root</span>
                        <Icon type="arrow-down-b" size="16" class="arrow-down-b"></Icon>
                    </Col>
                </Row>
                
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view/>
                    </div>
                </div>
            </Col>
        </Row>
        <div class="footer">
            <div>Copyright ⓒ  2016MyHome group.All right Reserved</div>
            <div>实地置业  版权所有</div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        methods: {
            openView (name) {
                this.$router.push(name)
                // this.$router.push({
                //     name: 'index',
                //     query: {
                //     id: 1,
                //     name: 2
                //     }
                // });
            }
        }
    }
</script>
<style lang="scss">
  @import "./style/style";
  .userInfo{text-align: center;height: 80px;line-height: 75px;}
  .textName{font-size: 16px;}
  .arrow-down-b{margin-top: -2px;}
</style>

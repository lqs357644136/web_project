<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <div class="sd-box sd-box2">
                <div class="sd-box-bar">
                    <span class="bluebar"></span>系统监控
                </div>
            </div>
            <hr class="hr1" />
            <Form v-model="queryItem">
                <div class="content-div">
                    <Row style="margin-bottom:5px;" :gutter="16">
                        <Col span="5" class="table-form-input-select-col">
                            <DatePicker type="date" placeholder="开始时间" style="width: 200px"></DatePicker>
                        </Col>
                        <Col span="5" class="table-form-input-select-col">
                            <DatePicker type="daterange" placement="bottom-end" placeholder="结束时间" style="width: 200px"></DatePicker>
                        </Col>
                        <Col span="14" class="table-form-input-select-col" style="text-align: right;">
                            <Button type="ghost" icon="ios-search" size="large" @click="getData" style="margin-right: 20px;">查询</Button>
                        </Col>
                    </Row>
                </div>
                <hr class="hr1" />
            </Form>
            <Row style="margin-bottom:5px;" :gutter="16">
                <Col span="6" class="table-form-input-select-col" v-for="(item, index) in items" :key="item.id">
                    <div class="select-box"  @click="selectBox(index)">
                        <div class="title">{{item.title}}:{{index}}</div>
                        <div class="content">{{item.content1}}
                            <span>{{item.con1_count}}</span>
                        </div>
                        <div class="content">{{item.content2}}
                            <span>{{item.con2_count}}</span>
                        </div>
                        <img src="../assets/checked.png" width="32" v-show="isShow">
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isShow: false,
                queryItem: {
                    name: '',
                    mobile: '',
                    address: '',
                    porject: ''                 
                },
                items: [
                    {
                        title: '拓客系统app',
                        content1: '新增客户：',
                        con1_count: '6',
                        content2: '修改客户：',
                        con2_count: '7'
                    },
                    {
                        id: 1,
                        title: '移动案场app',
                        content1: '新增客户：',
                        con1_count: '61',
                        content2: '修改客户：',
                        con2_count: '37'
                    },
                    {
                        id: 2,
                        title: '物业信息管理平台',
                        content1: '新增客户：',
                        con1_count: '23',
                        content2: '修改客户：',
                        con2_count: '347'
                    },
                    {
                        id: 3,
                        title: '贝壳树微信号',
                        content1: '新增客户：',
                        con1_count: '66',
                        content2: '修改客户：',
                        con2_count: '71'
                    },
                    {
                        id: 4,
                        title: '销售系统',
                        content1: '新增客户：',
                        con1_count: '86',
                        content2: '修改客户：',
                        con2_count: '56'
                    },
                    {
                        id: 5,
                        title: '客户主数据中心',
                        content1: '新增客户：',
                        con1_count: '0',
                        content2: '修改客户：',
                        con2_count: '0'
                    }
                ]
            }
        },
        created () {
            this.getData()
        },
        methods: {
            getData () {
                var self = this
                self.$api.get('/api/v1/table_data', null, function (result) {
                self.data = result.resultData.customerList
                self.pageData = result.resultData.pageData
                })
            },
            selectBox (index) {
                console.log(event.currentTarget);
                console.log(index);
                var self = this;
                var eve = event.currentTarget;
                self.eve.isShow = true;
            },
        }
    }
</script>
<style scoped>
.select-box .checked{border:2px solid #50B0F5;color:#50B0F5!important}
.select-box{width:100%;margin-right:20px;height:130px;float:left;border:1px solid #ccc;border-radius:10px;margin-bottom:20px;text-align:center;padding:15px;position:relative}
.select-box .title{height: 40px;line-height: 40px;font-size: 22px;font-weight: 800;}
.select-box .checked .content{color:#50B0F5!important}
.select-box .content{height:30px;line-height:30px;font-size:14px;color:#666}
/*.select-box .checked img{position:absolute;top:0;right:0;display:block}*/
.select-box img{position:absolute;top:0;right:0;border:0;margin:0;padding:0;vertical-align:middle}
/*img{border:0;margin:0;padding:0;vertical-align:middle}*/

</style>
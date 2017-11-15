<template>
    <div class="layout-content">
        <div class="layout-content-main">
            <div class="sd-box sd-box2">
                <div class="sd-box-bar">
                    <span class="bluebar"></span>客户列表
                </div>
            </div>
            <hr class="hr1" />
            <Form :model="queryItem" >
                <div class="content-div">
                    <Row style="margin-bottom:5px;" :gutter="16">
                        <Col span="8" class="table-form-input-select-col">
                            <Input v-model="queryItem.name" placeholder="客户姓名"></Input>
                        </Col>
                        <Col span="8" class="table-form-input-select-col">
                            <Input v-model="queryItem.mobile" placeholder="身份识别手机号"></Input>
                        </Col>
                        <Col span="8" class="table-form-input-select-col">
                            <Select v-model="queryItem.address" placeholder="客户类型">
                                <Option :value="customer.cst_type" :key="customer.cst_type" v-for="(customer, index) in customers">{{customer.customerType}}</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style="margin-bottom:5px;" :gutter="16">
                        <Col span="8" class="table-form-input-select-col">
                            <Select v-model="queryItem.porject" placeholder="全部项目">
                                <Option :value="proItem.proj_id" :key="proItem.proj_id" v-for="(proItem, index) in proItems">{{proItem.proName}}</Option>
                            </Select>
                        </Col>
                        <Col span="16" class="table-form-input-select-col" style="text-align: right;">
                            <Button type="ghost" icon="ios-search" size="large" @click="getData" style="margin-right: 20px;">查询</Button>
                            <Button type="primary" icon="plus" size="large" @click="getData">更多查询</Button>
                        </Col>
                    </Row>
                </div>
                <hr class="hr1" />
                <Row style="margin-bottom:15px;" :gutter="16">
                    <Col span="24" class="table-form-input-select-col"  style="text-align: right;">
                        <Button type="primary" icon="plus" size="large" @click="getData" style="margin-right: 20px;">新增公司客户</Button>
                        <Button type="primary" icon="plus" size="large" @click="getData">新增个人客户</Button>
                    </Col>
                </Row>
            </Form>
            <div class="content-div">
                <Table :columns="columns2" :data="data"></Table>
            </div>
            <div class="content-div" align="center">
                <Page @on-change="getData()" :total="pageData.total" :pageNum="pageData.page_num" :pageSize="pageData.page_size" style="padding:5px 5px 2px 5px;" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showDataModalFlag: false,
                showDataModalObject: {},
                editDataModalFlag: false,
                editDataModalObject: {},
                queryItem: {
                    name: '',
                    mobile: '',
                    address: '',
                    porject: ''                 
                },
                customers: [
                    {customerType: '个人客户', cst_type: 'person'},
                    {customerType: '企业客户', cst_type: 'enterprise'},
                ],
                proItems: [
                    {proj_id: '丁香雅苑', proName: '丁香雅苑'},
                    {proj_id: '三亚海棠之星', proName: '三亚海棠之星'},
                    {proj_id: '中山璟湖城', proName: '中山璟湖城'}
                ],
                columns2: [
                    {
                        title: '序号',
                        key: 'cusId',
                        width: 70
                    },
                    {
                        title: '客户姓名',
                        key: 'uname',
                        width: 100
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        width: 70
                    },
                    {
                        title: '身份识别手机号',
                        key: 'mobile',
                    },
                    {
                        title: '客户类型',
                        key: 'customerType',
                        width: 100
                    },
                    {
                        title: '证件类型',
                        key: 'cardId',
                        width: 100
                    },
                    {
                        title: '证件号码',
                        key: 'cardNum',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        render: (h, params) => {
                        return h('div', [
                            h('Button', {
                            props: {
                                type: 'info',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                this.showData(params.index)
                                }
                            }
                            }, '详细'),
                            h('Button', {
                            props: {
                                type: 'success',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                this.editData(params.index)
                                }
                            }
                            }, '编辑'),
                            h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                this.removeData(params.index)
                                }
                            }
                            }, '删除')
                        ])
                        }
                    }
                ],
                data: [],
                pageData: {
                page_num: 1,
                total: 0,
                page_size: 10
                }
            }
        },
        created () {
            this.getData()
        },
        methods: {
            getData () {
                var self = this
                
                self.$api.get('/login/checkLogin', function (result) {
                     console.log("==========");
                    console.log(result);
                self.data = result.resultData.customerList
                self.pageData = result.resultData.pageData
                })
            },
            showData (index) {
                var self = this
                self.showDataModalFlag = true
                self.showDataModalObject = self.data[index]
            },
            editData (index) {
                var self = this
                self.editDataModalFlag = true
                self.editDataModalObject = self.data[index]
            },
            doEditData () {
                var self = this
                self.$api.post('/api/v1/edit', self.editDataModalObject, function (result) {
                self.$Message.info(result.message)
                })
            },
            removeData (index) {
                var self = this
                self.$api.post('/api/v1/edit', self.data[index], function (result) {
                self.data.splice(index, 1)
                self.$Message.info(result.message)
                })
            }
        }
    }
</script>
<style scoped>
.ivu-select-item-selected, .ivu-select-item-selected:hover {
    color: #495060;
    background: none;
}
.ivu-select-item:hover {
    background: #f3f3f3;
}
    .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
</style>
import Vue from 'vue'
import Router from 'vue-router'
import FormPage from '@/page/form'
import TablePage from '@/page/table'
import CustomerList from '@/page/customer_list'
import Monitor from '@/page/monitor'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'table',
            component: TablePage
        },
        {
            path: '/table',
            name: 'table',
            component: TablePage
        },
        {
            path: '/customer_list',
            name: 'customer_list',
            component: CustomerList
        },
        {
            path: '/monitor',
            name: 'monitor',
            component: Monitor
        },
        {
            path: '/form',
            name: 'form',
            component: FormPage
        },
    ]
})

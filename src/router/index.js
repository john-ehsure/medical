import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import home from '@/view/home'
const messageList = () => import(/* webpackChunkName: "group-home" */  '@/view/messageList')
const personList = () => import(/* webpackChunkName: "group-home" */  '@/view/personList')
const historyMes = () => import(/* webpackChunkName: "group-home" */  '@/view/historyMes')
const diagnoseUp = () => import(/* webpackChunkName: "group-home" */  '@/view/diagnoseUp')
const building = () => import(/* webpackChunkName: "group-home" */  '@/view/building')
Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'login',
            path: '/login',
            title:'登陆',
            component: login
        },
        {
            path: '/',
            name: 'home',
            component: home,
            children: [
                {
                    name: 'messageList',
                    path: '/',
                    title: '消息列表',
                    miniTitle: '消息',
                    iconType: 'hui-icon-ziyuan1',
                    component: messageList
                },
                {
                    name: 'personList',
                    path: '/personList',
                    title: '患者列表',
                    miniTitle: '患者',
                    iconType: 'hui-icon-ziyuan3',
                    component: personList
                },
                {
                    name: 'diagnoseUp',
                    path: '/diagnoseUp',
                    title: '向上转诊',
                    miniTitle: '转诊',
                    iconType: 'hui-icon-ziyuan2',
                    component: diagnoseUp
                },
                {
                  name: 'communicate',
                  path: '/communicate',
                  title:'转院沟通',
                  miniTitle: '沟通',
                  iconType: 'hui-icon-ziyuan20',
                  component: building
                },
                {
                    name: 'historyMes',
                    path: '/historyMes',
                    title: '历史消息',
                    miniTitle: '历史',
                    iconType: 'hui-icon-ziyuan4',
                    component: historyMes
                }
            ]
        }
    ]
})

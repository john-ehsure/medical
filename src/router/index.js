import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import home from '@/view/home'
const messageList = () => import(/* webpackChunkName: "group-home" */  '@/view/messageList')
const personList = () => import(/* webpackChunkName: "group-home" */  '@/view/personList')
const historyMes = () => import(/* webpackChunkName: "group-home" */  '@/view/historyMes')
const diagnoseUp = () => import(/* webpackChunkName: "group-home" */  '@/view/diagnoseUp')
const chart = () => import(/* webpackChunkName: "group-home" */  '@/view/chart')
const ceshi = () => import(/* webpackChunkName: "group-home" */  '@/view/ceshi')
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
                    iconType: 'hui-icon-ziyuan26',
                    component: messageList
                },
                {
                    name: 'personList',
                    path: '/personList',
                    title: '患者列表',
                    miniTitle: '患者',
                    iconType: 'hui-icon-ziyuan27',
                    component: personList
                },
                {
                    name: 'diagnoseUp',
                    path: '/diagnoseUp',
                    title: '向上转诊',
                    miniTitle: '转诊',
                    iconType: 'hui-icon-ziyuan28',
                    component: diagnoseUp
                },
                {
                  name: 'communicate',
                  path: '/communicate',
                  title:'转院沟通',
                  miniTitle: '沟通',
                  iconType: 'hui-icon-ziyuan29',
                  component: chart
                },
                {
                    name: 'historyMes',
                    path: '/historyMes',
                    title: '历史消息',
                    miniTitle: '历史',
                    iconType: 'hui-icon-ziyuan30',
                    component: historyMes
                },
                {
                    name: 'ceshi',
                    path: '/ceshi',
                    title: '测试',
                    miniTitle: '测试',
                    iconType: 'hui-icon-ziyuan30',
                    component: ceshi
                }
            ]
        }
    ]
})

import { Layout, Avatar, Button, Image, message, Popconfirm, Card } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { PageContainer } from '@ant-design/pro-layout';
import Menu from '@/components/menu'
import eason from '@/img/eason.jpeg';
import hezhao from '@/img/hezhao.jpeg';
import hezhao2 from '@/img/hezhao2.jpeg';
import xtimer from '@/img/xtimer.png'


const { Content, Footer, Sider } = Layout;

const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigator = useNavigate();
    const location = useLocation();

    const unlogin = () => {
        sessionStorage.removeItem("app");
        navigator("/login");
        message.success("注销成功~");
    }

    return (
        // 左侧侧边栏
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <Image
                    width={200}
                    src={eason}
                />
                <br></br>
                <br></br>
                <br></br>
                <Menu />
            </Sider>

            {/* 右侧内容 */}
            <Layout className="site-layout">
                <Content style={{ margin: '0 0 0' }} className="site-layout-background">
                    <br></br>
                    <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'large', marginLeft: '1050px' }} size={55} gap={4}>
                        {sessionStorage.getItem("app")}
                    </Avatar>
                    <Popconfirm placement="leftTop" title="确认注销吗？" onConfirm={unlogin} okText="是" cancelText="否">
                        <Button
                            size="middle" style={{ margin: '0 16px', verticalAlign: 'middle' }}
                        >
                            注销
                        </Button>
                    </Popconfirm>

                    <Outlet />
                    {location.pathname == "/" && (
                        <div>

                            <Image
                                height={450}
                                src={xtimer}
                                style={{ paddingLeft: 25 }}
                            />
                            <br></br>
                            <br></br>
                            <Card size="default" title="xTimer: 一款基于 go 语言实现的分布式定时任务系统" headStyle={{ textAlign: "center", fontSize: "24px" }} hoverable={true} style={{ width: 1150, alignItems:"baseline" }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>开源地址: </p>
                                <a href='https://github.com/xiaoxuxiansheng/xtimer' >https://github.com/xiaoxuxiansheng/xtimer</a>
                                <br></br>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>技术文档: </p>
                                <a href='https://juejin.cn/post/7174007780104208392' >https://juejin.cn/post/7174007780104208392</a>
                                <br></br>
                                <br></br>
                                <p style={{ fontWeight: "bold", fontSize: "16px" }}>仅以此项目怀念和栋哥、欢哥、康总在前公司共同奋斗的日子~（还有跟着导师 devin 学习的日子）</p>
                                <Image
                                    height={450}
                                    width={330}
                                    src={hezhao}
                                />
                            </Card>
                        </div>
                    )}

                </Content>
                {/* 右侧底部 */}
                <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '72px' }}>---- 谢谢你，来看我的空间 ----</Footer>
            </Layout>
        </Layout>
    );
};

export default View;

{/* <p align="center">
<img src="https://github.com/xiaoxuxiansheng/xtimer/blob/main/common/img/xtimer.png" />
<b>xTimer: go 语言实现的分布式定时器</b>
<br/><br/>
</p>

## 📚 前言
仅以此项目怀念和栋哥、欢哥、康总在前公司共同奋斗的岁月~（还有跟着 devin 学习的日子）<br/><br/>
<img src="https://github.com/xiaoxuxiansheng/xtimer/blob/main/common/img/hezhao.jpeg" height="300px"/>

## 📖 简介
一款依赖于 mysql、redis 组件，基于 go 语言实现的分布式定时器

## 🚀 功能
- 提供定时器 crud 能力
- 基于 cron 表达式定义执行规则
- 支持 http 协议回调下游服务

## 🐧 体验页面
<a href="http://43.143.168.5:5173/login">前端体验页面</a> <br/><br/>
体验账号：test <br/><br/>
登录密码：test

## 💡 `xTimer` 技术原理
<a href="https://juejin.cn/post/7174007780104208392">xTimer 实现原理</a> <br/><br/>
<a href="https://juejin.cn/post/7116320697139331103">xTimer 前身 workflow.timer 实现原理</a>

## 🖥 接入 sop
1 用户需要提供好 mysql 和 redis 组件；<br/><br/>
2 在 mysql 中执行 ./common/model/sql 下的建表语句；<br/><br/>
3 ./conf.yml 中填写 mysql dsn 以及 redis 账号密码；<br/><br/>
4 运行 main 函数. <br/><br/>

## 📊 定制参数
在 ./conf.yml 中暴露了更多的参数供用户自主选择定义，这部分均配置默认值兜底,用户如需修改,请先了解技术原理,在熟悉源代码的基础上可自行调节
 */}

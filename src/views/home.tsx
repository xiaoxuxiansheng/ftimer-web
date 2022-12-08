import { Layout, Avatar, Button, Image, message, Popconfirm, Card } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { PageContainer } from '@ant-design/pro-layout';
import Menu from '@/components/menu'
import zxc from '@/img/zxc.png';
import hezhao from '@/img/hezhao.jpeg';
import hezhao2 from '@/img/hezhao2.jpeg';


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
                    src={zxc}
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
                        <PageContainer title="XTimer 定时器" >
                            <a href='https://github.com/xiaoxuxiansheng/xtimer' >github: https://github.com/xiaoxuxiansheng/xtimer</a><br /><br />
                            <Card style={{ width: 870, borderLeft:200 }}>
                                <p >仅以此项目怀念和栋哥、欢哥、康总在前公司共同奋斗的岁月~（还有跟着 devin 学习的日子）</p>
                            </Card>

                            <Image
                                height={450}
                                src={hezhao}
                                style={{ paddingLeft: 25 }}
                            />

                            <Image
                                height={450}
                                src={hezhao2}
                                style={{ paddingLeft: 75 }}
                            // style={{marginLeft:'100px',padding: 100% 0 }}
                            />


                        </PageContainer>
                    )}

                </Content>
                {/* 右侧底部 */}
                <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '72px' }}>---- 谢谢你，来看我的空间 ----</Footer>
            </Layout>
        </Layout>
    );
};

export default View;
import { Layout, Avatar, Button, Image, message, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import Menu from '@/components/menu'

const { Content, Footer, Sider } = Layout;

const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigator = useNavigate()

    const unlogin = () => {
        localStorage.removeItem("app");
        navigator("/login");
        message.success("注销成功~");
    }

    return (
        // 左侧侧边栏
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
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
                        {localStorage.getItem("app")}
                    </Avatar>
                    <Popconfirm placement="leftTop" title="确认注销吗？" onConfirm={unlogin} okText="是" cancelText="否">
                        <Button
                            size="middle" style={{ margin: '0 16px', verticalAlign: 'middle' }}
                        >
                            注销
                        </Button>
                    </Popconfirm>

                    <Outlet />

                </Content>
                {/* 右侧底部 */}
                <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '72px' }}>---- 谢谢你，来看我的空间 ----</Footer>
            </Layout>
        </Layout>
    );
};

export default View;
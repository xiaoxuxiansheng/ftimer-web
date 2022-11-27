import {
    FieldTimeOutlined,
    FilePdfOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, message as Message, Button } from 'antd';
import React, { FC} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('定时任务', '/timers', <FieldTimeOutlined />),
    getItem('待解锁项目...', '/docs1', <FilePdfOutlined />),
    getItem('待解锁项目...', '/docs2', <FilePdfOutlined />),
    getItem('待解锁项目...', '/docs3', <FilePdfOutlined />),
    getItem('待解锁项目...', '/docs4', <FilePdfOutlined />),
];


const Comp: FC = () => {
    const currentRoute = useLocation();
    const navigateTo = useNavigate();
    const handleClick = (e: { key: string }) => {
        if (e.key == '/timers') {
            navigateTo(e.key);
            return
        }
        navigateTo('/')
        Message.error("抱歉，仍在实现中~~ ^……^")
    }


    return (
            <Menu
                theme="dark"
                defaultSelectedKeys={[currentRoute.pathname]}
                mode="inline"
                items={items}
                onClick={handleClick}
            
            />
    );
};

export default Comp;
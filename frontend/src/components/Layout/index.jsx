import React, { useState, useMemo } from 'react';
import { Layout as AntLayout, Menu, Avatar, Dropdown, message } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { convertToMenuItems } from '@/utils/menu';
import './index.css';

const { Header, Sider, Content } = AntLayout;

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, logout } = useAuthStore();

  // 将拍平的菜单数据转换为 Ant Design Menu 需要的树形结构
  const menuItems = useMemo(() => {
    if (!userInfo?.menus || userInfo.menus.length === 0) {
      return [];
    }
    // 使用工具函数将拍平的菜单转换为树形结构
    return convertToMenuItems(userInfo.menus, true);
  }, [userInfo?.menus]);

  const userMenuItems = [
    {
      key: 'info',
      icon: <UserOutlined />,
      label: '个人信息'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true
    }
  ];

  const handleMenuClick = ({ key }) => {
    // 菜单路径已经是完整路径（如 /system/user），直接导航
    if (key) {
      navigate(key);
    }
  };

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
    } else if (key === 'info') {
      message.info('个人信息功能待开发');
    }
  };

  return (
    <AntLayout className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {collapsed ? 'Admin' : '后台管理系统'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={menuItems.map(item => item.key).filter(Boolean)}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <AntLayout>
        <Header className="layout-header">
          <div className="header-left">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            })}
          </div>
          <div className="header-right">
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick
              }}
              placement="bottomRight"
            >
              <div className="user-info">
                <Avatar icon={<UserOutlined />} />
                <span className="username">{userInfo?.nickname || userInfo?.username}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="layout-content">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;


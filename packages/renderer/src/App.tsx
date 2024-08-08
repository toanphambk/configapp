import React, {useState} from 'react';
import {ProjectFilled} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu} from 'antd';
import {Link, Routes, Route, HashRouter} from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import {Content} from 'antd/es/layout/layout';
import ProjectPage from './page/project';

type MenuItem = {
  key: string;
  icon: JSX.Element;
  label: string;
  element: JSX.Element;
  to: string;
};
const menuItems: MenuItem[] = [
  {
    key: 'Project',
    icon: <ProjectFilled />,
    label: 'Project',
    element: <ProjectPage />,
    to: '/',
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string>(menuItems[0].key);

  const handleMenuClick = (key: string) => {
    setSelectedMenu(key);
  };

  return (
    <HashRouter>
      <Layout style={{minHeight: '100vh'}}>
        <s />
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            top: 0,
            left: 0,
          }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={[menuItems[0].key]}
            selectedKeys={[selectedMenu]}
            mode="inline"
            onClick={e => handleMenuClick(e.key)}
          >
            {menuItems.map(item => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
              >
                <Link to={item.to}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{margin: '0 16px'}}
            className="overflow-auto"
          >
            <Breadcrumb className="my-5">
              <Breadcrumb.Item>App</Breadcrumb.Item>
              <Breadcrumb.Item>
                {menuItems.find(item => item.key === selectedMenu)?.label}
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex flex-col items-center justify-center rounded-lg shadow-lg">
              <Routes>
                {menuItems.map(item => (
                  <Route
                    key={item.key}
                    path={item.to}
                    element={item.element}
                  />
                ))}
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
};

export default App;

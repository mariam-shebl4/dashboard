import React from 'react';
import { Input, Layout, Menu, Typography, theme } from 'antd';
import Organization from './Organization';
import Public from './Public';
import { SearchOutlined } from "@ant-design/icons"
import { MdSettingsSuggest } from 'react-icons/md';
import { BsPersonFillGear } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { AiFillLock } from 'react-icons/ai';

const { Content, Sider } = Layout;
const Sidenav = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout style={{
      margin: '2rem 2rem',
      padding: '0 24',
      background: colorBgContainer,
    }}>
      {/* the hole sidebar */}
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={300}

      >
        {/* the sidebar's body */}
        <div >
          <div style={{ margin: '18px 14px' }}>
            <Typography.Title level={4}>Account Settings</Typography.Title>
            <Input size="large" placeholder="Search" prefix={<SearchOutlined />} style={{ width: "100%", margin: '20px 0' }} />
          </div>
          <div className="demo-logo-vertical" />
          {/* the sidebar's menu */}
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <MdSettingsSuggest />,
                label: 'General Settings',
              },
              {
                key: '2',
                icon: <MdSettingsSuggest />,
                label: 'Account Settings',
              },
              {
                key: '3',
                icon: <BsPersonFillGear />,
                label: 'Organization',
              },
              {
                key: '4',
                icon: <AiFillLock />,
                label: 'Organization Settings',
              },
              {
                key: '5',
                icon: <AiOutlineDollarCircle />,
                label: 'Subscription & Billing',
              },
            ]}
          />
        </div>
      </Sider>
      <Layout style={{
        padding: '0 24px 24px',
      }}>

        {/* the body of the page */}
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Organization />
            <Public />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};
export default Sidenav;
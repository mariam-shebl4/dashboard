"use client"

import React, { useState } from 'react';
import {

  ArrowLeftOutlined,
  ArrowRightOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Typography } from 'antd';
import Sidenav from './Sidenav';
import { BiGroup } from 'react-icons/bi';
import { BsBag, BsHeadset, BsSave } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import { CgOrganisation } from 'react-icons/cg';
import { IoIosPaper } from 'react-icons/io';
import { CiMenuKebab } from 'react-icons/ci';
import icon from "../../image/Ellipse20.png"
const {  Sider } = Layout;

const Navbar = () => {
  //? to collaps the sidenav
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const icon = "../../image/Ellipse20.png"
  return (
    <Layout>
      <div style={{ display: 'flex' }} >

        <Sider theme="light" trigger={null} collapsible collapsed={collapsed} >
          {/* the collaps button */}
          <Button
            type="text"
            icon={collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: '29px',
              height: '37px',
              position: 'absolute',
              left: collapsed ? "4.1rem" : "11.5rem",
              top: '.5rem',
              borderRadius: '5rem',
              backgroundColor: "#fff",
              zIndex: 4
            }}
            theme="light"
          />
          <div style={{
            flexDirection: "column",
            display: "flex",
            alignItems: 'center',
            marginTop: '7rem'
          }}>
            {/* the top section in the sidenav */}
            <div style={{ margin: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar src={icon} size="large" />
              <p style={{ margin: '1rem 0' }}>
                <CiMenuKebab />
              </p>
            </div>
            {/* ------------------------------------ */}
            {/* the middle menu in the sidenav */}
            <div>
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: <IoHomeOutline />,
                    label: 'nav 1',
                  },
                  {
                    key: '2',
                    icon: <BsBag />,
                    label: 'nav 2',
                  },
                  {
                    key: '3',
                    icon: <BiGroup />,
                    label: 'nav 3',
                  },
                  {
                    key: '4',
                    icon: <CgOrganisation />,
                    label: 'nav 4',
                  },
                  {
                    key: '5',
                    icon: <BsSave />,
                    label: 'nav 4',
                  },
                  {
                    key: '6',
                    icon: <IoIosPaper />,
                    label: 'nav 4',
                  },
                  {
                    key: '7',
                    icon: <BsHeadset />,
                    label: 'nav 1',
                  },
                  {
                    key: '8',
                    icon: <SettingOutlined />,
                    label: 'nav 2',
                  },
                ]}
              />
            </div>
            {/* ---------------------------------------- */}
           
            {/* --------------------------------------- */}
          </div>
        </Sider>
      </div>
      <Layout >
        <Sidenav />
      </Layout>
    </Layout>
  );
};
export default Navbar;


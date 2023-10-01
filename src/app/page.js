"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Navbar from '@/componants/Navbar'
import { ConfigProvider, Layout } from 'antd'
import Organization from '@/componants/Organization'
import Public from '@/componants/Public'
import Sidenav from '@/componants/Sidenav'
import theme from '../../theme/themeConfig'

const { Content } = Layout;
export default function Home() {


  return (
    <ConfigProvider theme={theme} className={styles.main}>
      <Layout style={{
        margin: '2rem 2rem',
        padding: '0 24',
        background: "#f5f5f5",
      }}>


        <Sidenav />
        {/* the body of the page */}
        <Layout style={{
          padding: '0 24px 24px',
        }}>
          <Content>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: "#fff",
              }}>
              <Organization />
              <Public />
            </div>
          </Content>
        </Layout>

      </Layout>


    </ConfigProvider>
  )
}

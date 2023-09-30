"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Navbar from '@/componants/Navbar'
import { Layout, theme } from 'antd'
import Organization from '@/componants/Organization'
import Public from '@/componants/Public'
const { Content, Sider } = Layout;
export default function Home() {
 

  return (
    <main className={styles.main}>
        {/* the body of the page */}
        {/* <Layout style={{
        padding: '0 24px 24px',
      }}>

        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "gray",
            }}
          >
            <Organization />
            <Public />
          </div>
        </Content>
      </Layout> */}

     
    </main>
  )
}

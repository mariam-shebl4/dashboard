import Navbar from '@/componants/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Layout} from 'antd';
import StyledComponentsRegistry from '../lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] })
const { Content, Sider } = Layout;
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
      <Layout>
      

<StyledComponentsRegistry>
      <Navbar/>
      <Layout >
      {children}
      </Layout>
</StyledComponentsRegistry>
     
      </Layout>
      </body>
    </html>
  )
}

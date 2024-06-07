'use client'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Public_Sans } from 'next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider, message } from 'antd'

import ReduxProvider from './redux/ReduxProvider'
import config from './theme'

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})
const queryClient = new QueryClient()
export default function RootLayout({ children }) {
  // const [messageApi, contextHolder] = message.useMessage();
  return (
    <html lang="en">
      <body className={publicSans.className}>
        <ReduxProvider>
          <QueryClientProvider client={queryClient}>
            <AntdRegistry>
              <ConfigProvider theme={config} wave={{ disabled: true }}>
                <App
                  message={{
                    duration: 2,
                    maxCount: 3,
                  }}
                >
                  {/* {contextHolder} */}
                  {children}
                </App>
              </ConfigProvider>
            </AntdRegistry>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

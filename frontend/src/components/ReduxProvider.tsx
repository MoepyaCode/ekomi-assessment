'use client'
import store from '@/store'
import React from 'react'
import { Provider } from 'react-redux'

type Props = {
    children: React.ReactNode
}

export function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default ReduxProvider

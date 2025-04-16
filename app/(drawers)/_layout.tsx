import { Drawer } from "expo-router/drawer";
import React from 'react'
import index from '../index'

const _Layout = () => {
  return (
    //automatically creates a drawer with every sibling screen (every file also in (drawers)) as an item, with some screenOptions.
    <Drawer
    screenOptions={{
      headerStyle: { backgroundColor: '#1e90ff' },
      headerTintColor: '#fff',
      drawerStyle: { backgroundColor: '#f0f0f0' },
    }}
    >
      
  </Drawer>
  )
}

export default _Layout
import { Col, Row } from 'antd'
import React from 'react'
import { Navigate } from 'react-router-dom'
import ChatWindow from './ChatWindow'
import SideBar from './SideBar'

export default function ChatRoom() {
  const token = localStorage.getItem('token')
  // console.log(!token)
  if (!token) return <Navigate to='/login' />
  return (
    <div className='chatRoom'>
      <Row>
        <Col span={6}><SideBar /></Col>
        <Col span={18}><ChatWindow /></Col>
      </Row>
    </div>
  )
}

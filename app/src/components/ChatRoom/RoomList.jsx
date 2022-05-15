import { PlusSquareOutlined } from '@ant-design/icons'
import { Button, Collapse, Typography } from 'antd'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../context/AppProvider'

const { Panel } = Collapse

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px
    }

    .addRoom {
      color: white;
      padding: 0;
    }
  }
`
const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-botton: 5px;
  color: white

`

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true)
  }
  return (
    <div className='roomList'>
      <Collapse ghost defaultActiveKey={['1']}>
        <PanelStyled header='Danh sách các phòng' key='1'>
          {rooms.map(room =>
            <LinkStyled
              key={room.id}
              onClick={() => setSelectedRoomId(room.id)}
            >{room.name}</LinkStyled>
          )}
          <Button type='text'
            icon={<PlusSquareOutlined />}
            className='addRoom'
            onClick={handleAddRoom}>
            Add Room
          </Button>
        </PanelStyled>
      </Collapse>
    </div>
  )
}

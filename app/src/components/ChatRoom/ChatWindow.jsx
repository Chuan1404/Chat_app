import React from 'react'
import styled from 'styled-components'
import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Tooltip } from 'antd'
import Message from './Message'

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header{
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px
    }
  }
`
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`
const WrapperStyled = styled.div`
  height: 100vh;
`
const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`

export default function ChatWindow() {
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className='header__info'>
          <p className='header__title'>Room 1</p>
          <span className='header__description'>Day la room 1</span>
        </div>
        <div>
          <ButtonGroupStyled>
            <Button type='text' icon={<UserAddOutlined />}>Mời</Button>
          </ButtonGroupStyled>
          <Avatar.Group size='2' maxCount={2}>
            <Tooltip title='A'>
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title='A'>
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title='A'>
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title='A'>
              <Avatar>A</Avatar>
            </Tooltip>
          </Avatar.Group>
        </div>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message text='test'
            photoURL={null}
            displayName='Tung'
            createAt={123123123123123} />
          <Message text='test'
            photoURL={null}
            displayName='Tung'
            createAt={123123123123123} />
          <Message text='test'
            photoURL={null}
            displayName='Tung'
            createAt={123123123123123} />
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input placeholder='Input...' border='false' autoComplete='off'/>
          </Form.Item>
          <Button>Send</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}

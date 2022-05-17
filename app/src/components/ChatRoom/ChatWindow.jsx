import { UserAddOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd'
import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import { addDocument } from '../../firebase/service'
import useFirebase from '../../hooks/useFirebase'
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
  const { selectedRoom, members, setIsInviteMember } = useContext(AppContext)
  const { user: { uid, displayName, photoURL } } = useContext(AuthContext)
  const [form] = Form.useForm()
  const [input, setInput] = useState();
  const condition = useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id
  }), [selectedRoom.id])
  const messages = useFirebase('messages', condition)
  const handleInputChange = (e) => {
    setInput(e.target.value)
  }
  const handleSubmit = () => {
    addDocument('messages', {
      text: input,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName
    })
    form.resetFields(['messages'])
  }


  return (
    <WrapperStyled>
      {selectedRoom.id ?
        <>
          <HeaderStyled>
            <div className='header__info'>
              <p className='header__title'>{selectedRoom?.name}</p>
              <span className='header__description'>{selectedRoom?.description}</span>
            </div>
            <div>
              <ButtonGroupStyled>
                <Button
                  type='text'
                  icon={<UserAddOutlined />}
                  onClick={() => setIsInviteMember(true)}>Mời</Button>
              </ButtonGroupStyled>
              <Avatar.Group size='2' maxCount={2}>
                {members.map(member =>
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0).toUpperCase()}</Avatar>
                  </Tooltip>)}
              </Avatar.Group>
            </div>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages?.map(mes =>
                <Message text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createAt={mes.createAt}
                />
              )}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name='messages'>
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleSubmit}
                  placeholder='Input...'
                  border='false'
                  autoComplete='off' />
              </Form.Item>
              <Button onClick={handleSubmit}>Send</Button>
            </FormStyled>
          </ContentStyled>
        </> :
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }} closable />}

    </WrapperStyled>
  )
}

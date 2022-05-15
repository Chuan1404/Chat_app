import React, { useContext } from 'react'
import { Form, Input, Modal } from 'antd'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import { addDocument } from '../../firebase/service'

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { user: {uid} } = useContext(AuthContext)
    const [form] = Form.useForm()
    const handleOk = () => {
        // console.log({ formData: form.getFieldValue() })
        addDocument('rooms', {
            ...form.getFieldValue(),
            members: [uid]
        })
        form.resetFields()

        setIsAddRoomVisible(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setIsAddRoomVisible(false)
    }
    return (
        <div>
            <Modal title='Tạo phòng'
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form}>
                    <Form.Item label='Tên phòng' name='name'>
                        <Input placeholder='Nhập tên phòng' />
                    </Form.Item>
                    <Form.Item label='Mô tả' name='description'>
                        <Input placeholder='Nhập mô tả' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

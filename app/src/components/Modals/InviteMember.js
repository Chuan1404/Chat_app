import { Avatar, Form, Modal, Select, Spin } from 'antd'
import { debounce } from 'lodash'
import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { db } from '../../firebase/config'

function DebounceSelect({ fetchOptions, debounceTimeout = 300, currrentMem, ...props }) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = value => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, currrentMem).then(newOptions => {
                setOptions(newOptions);
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])

    return (<Select

        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size='small' /> : null}
        {...props}>
        {
            options.map(opt => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))
        }
    </Select>)
}

async function fetchUserList(search, currrentMem) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                })).filter(opt => !currrentMem.includes(opt.value))
        })
}

export default function InviteMember() {
    const { isInviteMember, setIsInviteMember, selectedRoom, selectedRoomId } = useContext(AppContext)
    const [value, setValue] = useState([])
    const [form] = Form.useForm()
    const handleOk = () => {

        form.resetFields()
        // setValue([]);
        const roomRef = db.collection('rooms').doc(selectedRoomId)
        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        })
        setIsInviteMember(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setValue([]);
        setIsInviteMember(false)
    }
    return (
        <div>
            <Modal title='Mời thành viên'
                visible={isInviteMember}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form}>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        label='Tất cả thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        currrentMem={selectedRoom.members} />
                </Form>
            </Modal>
        </div>
    )
}

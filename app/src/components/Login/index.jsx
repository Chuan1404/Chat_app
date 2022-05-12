import { Button, Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../store/slices/authSilce';
import firebase, { auth } from '../firebase/config';

const { Title } = Typography

const fbProvider = new firebase.auth.FacebookAuthProvider()

export default function Login() {
    const { isLogin } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(login(user))
            }
        })
    }, [isLogin])

    const handeLoginFabook = () => {
        auth.signInWithPopup(fbProvider)
    }
    if (isLogin) {
        return <Navigate to='/' />
    }
    return (
        <div className='login'>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>Fun chat</Title>
                    <Button style={{ width: '100%', marginBottom: 5 }}>Login by Google</Button>
                    <Button style={{ width: '100%' }}
                        onClick={handeLoginFabook}>Login by Facebook</Button>
                </Col>
            </Row>
        </div>
    )
}


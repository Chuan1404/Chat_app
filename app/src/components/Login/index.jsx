import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import firebase, { auth, db } from '../../firebase/config';
import { addDocument } from '../../firebase/service';

const { Title } = Typography

const fbProvider = new firebase.auth.FacebookAuthProvider()

export default function Login() {

    const handeLoginFabook = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)
        // console.log(data)

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId
            });
        }
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


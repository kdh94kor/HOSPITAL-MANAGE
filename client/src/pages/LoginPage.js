
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

function LoginPage() {
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await fetch('/api/login_V1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    empuid: userId,
                    emppwd: userPwd
                }),
            });

            if (response.ok) {
                navigate('/manage');
            } else {
                const result = await response.json();
                setMessage(result.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 실패 : ', error);
            setMessage('로그인 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">로그인</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label">아이디</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userPwd" className="form-label">비밀번호</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userPwd"
                                value={userPwd}
                                onChange={(e) => setUserPwd(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">로그인</button>
                        </div>
                    </form>
                    <div id="display-message" className="text-danger text-center mt-2">
                        {message}
                    </div>
                    <div className="text-center mt-3">
                        <a href="/signup">회원가입</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

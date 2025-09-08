
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

function SignupPage() {
    
    const [empId, setEmpId] = useState('');
    const [empPwd, setEmpPwd] = useState('');
    const [empNam, setEmpNam] = useState('');
    const [empDep, setEmpDep] = useState('');
    const navigate = useNavigate();

    const handleCheckDuplicate = async () => {
        if (empId) {
            try {
                const response = await fetch(`/api/manage/check-id/${empId}`);
                const data = await response.json();
                if (data.exists) {
                    alert('이미 사용중인 아이디입니다.');
                } else {
                    alert('사용 가능한 아이디입니다.');
                }
            } catch (error) {
                console.error('Error checking ID:', error);
                alert('아이디 확인 중 오류가 발생했습니다. 다시 진행해 주세요.ㅜ');
            }
        }
    };

    const handleSignup = async () => {
        if (!empId || !empPwd || !empNam || !empDep) {
            alert('모든 항목은 필수로 입력하셔야 합니다.');
            return;
        }
        try {
            const response = await fetch('/api/manage/signup_V1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    empuid: empId,
                    emppwd: empPwd,
                    empnam: empNam,
                    empdepcod: empDep
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('회원가입이 완료 되었습니다. 로그인 화면으로 이동합니다.');
                navigate('/');
            } else {
                alert('회원가입에 실패했습니다. 관리자에게 문의해 주세요. ' + result.message);
            }
        } catch (error) {
            console.error('signup error:', error);
            alert('회원가입에 실패했습니다. 관리자에게 문의해 주세요. ');
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">회원가입</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">아이디</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="emp-id" value={empId} onChange={(e) => setEmpId(e.target.value)} required />
                                <button type="button" className="btn btn-outline-secondary" onClick={handleCheckDuplicate}>중복확인</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">비밀번호</label>
                            <input type="password" className="form-control" id="emp-pwd" value={empPwd} onChange={(e) => setEmpPwd(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">이름</label>
                            <input type="text" className="form-control" id="emp-nam" value={empNam} onChange={(e) => setEmpNam(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="department" className="form-label">부서</label>
                            <input type="text" className="form-control" id="emp-depcod" value={empDep} onChange={(e) => setEmpDep(e.target.value)} required />
                        </div>
                        <div className="d-grid">
                            <button type="button" className="btn btn-primary" onClick={handleSignup}>가입하기</button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <a href="/">로그인 페이지로 돌아가기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;

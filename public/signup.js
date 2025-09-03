document.addEventListener('DOMContentLoaded', () => {
    
    const checkDuplicateBtn = document.getElementById('check-duplicate-btn');
    const signupBtn = document.getElementById('signup-btn');

    // 중복학인 구현하기
    if (checkDuplicateBtn) {
        checkDuplicateBtn.addEventListener('click', async () => {
            const empId = document.getElementById('emp-id').value;
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
        });
    }

    // 회원가입 구현하기
    if (signupBtn) {
        signupBtn.addEventListener('click', async () => {
                const empId = document.getElementById('emp-id').value;
                const empPwd = document.getElementById('emp-pwd').value;
                const empNam = document.getElementById('emp-nam').value;
                const empDep = document.getElementById('emp-depcod').value;

                if (!empId || !empPwd || !empNam || !empDep){
                    alert('모든 항목은 필수로 입력하셔야 합니다.');
                    return;
                }
                try{
                    const response = await fetch('/api/manage/signup_V1',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',

                        },
                        body:JSON.stringify ({
                            empuid : empId,
                            emppwd : empPwd,
                            empnam: empNam,
                            empdepcod : empDep
                        }),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        alert('회원가입이 완료 되었습니다. 로그인 화면으로 이동합니다.');
                        window.location.href = '/index.html';

                    } else {
                        alert('회원가입에 실패했습니다. 관리자에게 문의해 주세요. ' + result.message);
                    }
                } catch (error) {
                    console.error('signup error:',error);
                    alert('회원가입에 실패했습니다. 관리자에게 문의해 주세요. ' + result.message);
                }
        });
    }
});
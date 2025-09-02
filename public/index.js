document.addEventListener('DOMContentLoaded', () => {
    const loginDiv = document.getElementById('login-form');
    const displayMsg = document.getElementById('display-message');

    loginDiv.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userId = document.getElementById('userId').value;
        const userPwd = document.getElementById('userPwd').value;
        
        console.log('입력 아이디 : '+ userId + '비번 : ' + userPwd);
            
        displayMsg.textContent = ''; 

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
                window.location.href = '/manage.html';
            } else {
                const result  = await response.json();
                displayMsg.textContent = result.message || '로그인에 실패했습니다.';
            }
        } catch (error) {
            console.error('로그인 실패 : ', error);
            displayMsg.textContent = '로그인 요청 중 오류가 발생했습니다.';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    const checkDuplicateBtn = document.getElementById('check-duplicate-btn');
    const signupBtn = document.getElementById('signup-btn');

    // 중복학인 구현하기
    if (checkDuplicateBtn) {
        checkDuplicateBtn.addEventListener('click', () => {
            const userId = document.getElementById('user-id').value;
            if (userId) {
            }
        });
    }

    // 회원가입 구현하기
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            const userId = document.getElementById('user-id').value;
            const userPwd = document.getElementById('user-password').value;
        });
    }
    
});
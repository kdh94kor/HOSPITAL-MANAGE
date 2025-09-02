document.addEventListener('DOMContentLoaded', () => {
    const hospitalList = document.getElementById('hospital-list');
    const hospitalForm = document.getElementById('hospital-form');
    const columns = [
        'HSPCOD', 'HSPNAM', 'HSPSTRDTE', 'HSPENDDTE', 'HSPGRD', 'HSPIP', 'HSPPORT', 
        'HSPPWD', 'HSPAUTOLIST', 'HSPMEALYON', 'HSPETC', 'HSPPACSCO', 'HSPSMSCO', 
        'HSPHSTSTRDTE', 'HSPHSTENDDTE', 'HSPSEEUSEYON', 'HSPOCSVER'
    ];

    // 병원 목록 가져오기
    async function fetchHospitals() {
        try {
            const response = await fetch('/api/hospitals');
            if (!response.ok) {
                throw new Error(`오류코드 : ${response.status}`);
            }
            const hospitals = await response.json();
            
            hospitalList.innerHTML = ''; // 목록 초기화
            hospitals.forEach(hospital => {
                const row = document.createElement('tr');
                let rowHTML = '';
                columns.forEach(col => {
                    rowHTML += `<td>${hospital[col] || ''}</td>`;
                });
                rowHTML += `
                    <td>
                        <button class="btn btn-sm btn-warning">수정</button>
                        <button class="btn btn-sm btn-danger">삭제</button>
                    </td>
                `;
                row.innerHTML = rowHTML;
                hospitalList.appendChild(row);
            });
        } catch (error) {
            console.error('조회 실패 : ', error);
        }
    }

    // 새 병원 추가
    hospitalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newHospitalData = {};
        columns.forEach(col => {
            newHospitalData[col] = document.getElementById(col).value;
        });

        try {
            const response = await fetch('/api/hospitals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHospitalData),
            });

            if (response.ok) {
                hospitalForm.reset();
                fetchHospitals(); 
            } else {
                const errorData = await response.json();
                console.error('Failed to add hospital:', errorData);
                alert('병원 추가 실패: ' + (errorData.errors ? errorData.errors.join(', ') : '서버 오류'));
            }
        } catch (error) {
            console.error('Error adding hospital:', error);
        }
    });

    // 초기 병원 목록 로드
    fetchHospitals();
});
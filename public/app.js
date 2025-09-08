document.addEventListener('DOMContentLoaded', () => {
    const hospitalListElement = document.getElementById('hospital-list');
    let allHospitals = []; 
    
    const columns = [
        'HSPCOD', 'HSPNAM', 'HSPSTRDTE', 'HSPENDDTE', 'HSPGRD', 'HSPIP', 'HSPPORT', 
        'HSPPWD', 'HSPAUTOLIST', 'HSPMEALYON', 'HSPETC', 'HSPPACSCO', 'HSPSMSCO', 
        'HSPHSTSTRDTE', 'HSPHSTENDDTE', 'HSPSEEUSEYON', 'HSPOCSVER'
    ];

    function displayHospitalDetails(hspcod) {
        const selectedHospital = allHospitals.find(h => h.HSPCOD === hspcod);
        if (!selectedHospital) return;

        columns.forEach(col => {
            const inputElement = document.getElementById(`detail-${col}`);
            if (inputElement) {
                inputElement.value = selectedHospital[col] || '';
            }
        });
    }

    async function fetchHospitals() {
        try {
            const response = await fetch('/api/hospitals_V1');
            if (!response.ok) {
                throw new Error(`목록을 불러오는데 실패했습니다. ${response.status}`);
            }
            allHospitals = await response.json();
            
            hospitalListElement.innerHTML = ''; 

            allHospitals.forEach(hospital => {
                const listItem = document.createElement('button');
                listItem.type = 'button';
                listItem.className = 'list-group-item list-group-item-action';
                listItem.textContent = hospital.HSPNAM;
                listItem.dataset.hspcod = hospital.HSPCOD;
                hospitalListElement.appendChild(listItem);
            });
        } catch (error) {
            console.error('Failed to fetch hospitals:', error);
        }
    }

    hospitalListElement.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.list-group-item')) {
            const currentlyActive = hospitalListElement.querySelector('.active');
            if (currentlyActive) {
                currentlyActive.classList.remove('active');
            }
            e.target.classList.add('active');

            const hspcod = e.target.dataset.hspcod;
            displayHospitalDetails(hspcod);
        }
    });

    fetchHospitals();
});

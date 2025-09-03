document.addEventListener('DOMContentLoaded', () => {
    const hospitalListElement = document.getElementById('hospital-list');
    let allHospitals = []; // To store all hospital data

    // Use lowercase column names to match the data from the server
    const columns = [
        'hspcod', 'hspnam', 'hspstrdte', 'hspenddte', 'hspgrd', 'hspip', 'hspport', 
        'hsppwd', 'hspautolist', 'hspmealyon', 'hspetc', 'hsppacsco', 'hspsmsco', 
        'hsphststrdte', 'hsphstenddte', 'hspseeuseyon', 'hspocsver'
    ];

    // Function to display details of a selected hospital
    function displayHospitalDetails(hspcod) {
        const selectedHospital = allHospitals.find(h => h.hspcod === hspcod);
        if (!selectedHospital) return;

        columns.forEach(col => {
            const inputElement = document.getElementById(`detail-${col}`);
            if (inputElement) {
                inputElement.value = selectedHospital[col] || '';
            }
        });
    }

    // Fetch all hospitals and populate the list on the left
    async function fetchHospitals() {
        try {
            const response = await fetch('/api/hospitals_V1');
            if (!response.ok) {
                throw new Error(`Error fetching hospitals: ${response.status}`);
            }
            allHospitals = await response.json();
            
            hospitalListElement.innerHTML = ''; // Clear existing list
            allHospitals.forEach(hospital => {
                const listItem = document.createElement('button');
                listItem.type = 'button';
                listItem.className = 'list-group-item list-group-item-action';
                listItem.textContent = hospital.hspnam; // Use lowercase
                listItem.dataset.hspcod = hospital.hspcod; // Use lowercase
                hospitalListElement.appendChild(listItem);
            });
        } catch (error) {
            console.error('Failed to fetch hospitals:', error);
        }
    }

    // Add click listener to the list to handle hospital selection
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

    // Initial fetch of hospitals
    fetchHospitals();
});
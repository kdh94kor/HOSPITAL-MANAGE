
import React, { useState, useEffect } from 'react';
import './style.css';

function ManagePage() {
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);

    const columns = [
        'hspcod', 'hspnam', 'hspstrdte', 'hspenddte', 'hspgrd', 'hspip', 'hspport',
        'hsppwd', 'hspautolist', 'hspmealyon', 'hspetc', 'hsppacsco', 'hspsmsco',
        'hsphststrdte', 'hsphstenddte', 'hspseeuseyon', 'hspocsver'
    ];

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        try {
            const response = await fetch('/api/hospitals_V1');
            if (!response.ok) {
                throw new Error(`Error fetching hospitals: ${response.status}`);
            }
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            console.error('Failed to fetch hospitals:', error);
        }
    };

    const displayHospitalDetails = (hspcod) => {
        const hospital = hospitals.find(h => h.hspcod === hspcod);
        setSelectedHospital(hospital);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">병원 관리 시스템</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">로그아웃</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <h2>병원 목록</h2>
                        <div className="list-group" id="hospital-list">
                            {hospitals.map(hospital => (
                                <button
                                    type="button"
                                    key={hospital.hspcod}
                                    className={`list-group-item list-group-item-action ${selectedHospital && selectedHospital.hspcod === hospital.hspcod ? 'active' : ''}`}
                                    onClick={() => displayHospitalDetails(hospital.hspcod)}
                                >
                                    {hospital.hspnam}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-8">
                        <h2>병원 상세 정보</h2>
                        <div className="card">
                            <div className="card-body">
                                <form id="hospital-details-form">
                                    <div className="row">
                                        {columns.map(col => (
                                            <div className="col-md-6 mb-3" key={col}>
                                                <label htmlFor={`detail-${col}`} className="form-label">{col}</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id={`detail-${col}`}
                                                    value={selectedHospital ? selectedHospital[col] || '' : ''}
                                                    readOnly
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagePage;

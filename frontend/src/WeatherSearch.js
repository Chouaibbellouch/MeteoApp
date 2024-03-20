import React, { useState } from 'react';

const WeatherSearch = ({ onSearch }) => {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(location);
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex justify-content-center mt-4">
            <div className="w-50">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Entrez une ville"
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary ml-2">Rechercher</button>
        </form>
    );
    
    
};

export default WeatherSearch;

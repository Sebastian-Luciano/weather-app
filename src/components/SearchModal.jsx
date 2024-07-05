import React, { useState, useEffect } from 'react';
import { useClima } from '../hooks/useClima';

export default function SearchModal({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { results, lastSearch, buscarLocaciones, buscarClimaManual, resetBusquedaManual } = useClima();

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
        }
    }, [isOpen]);

    const handleSearch = async (e) => {
        e.preventDefault();
        await buscarLocaciones(searchTerm);
        setSearchTerm('');
    };

    const handleSelectLocation = (lat, lon) => {
        if (typeof resetBusquedaManual === 'function') {
            resetBusquedaManual();
        }
        if (typeof buscarClimaManual === 'function') {
            buscarClimaManual(`${lat},${lon}`);
        } else {
            console.error('buscarClimaManual no es una función');
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='absolute top-0 left-0 w-full h-full bg-[#1E213A] z-20 p-4'>
            <button onClick={onClose} className='absolute top-4 right-4 text-white'>
                <span className='material-icons'>close</span>
            </button>
            <form onSubmit={handleSearch} className='flex mt-8 relative'>
                <span className='material-icons absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'>search</span>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search location'
                    className='flex-grow bg-transparent border border-white text-white p-2 pl-10 h-12'
                />
                <button type='submit' className='bg-[#3C47E9] text-white px-4 py-2 ml-2 h-12 w-[86px]'>
                    Search
                </button>
            </form>
            {results.length > 0 && (
                <div className='mt-4'>
                    <h3 className='text-white mb-2'>Results for "{lastSearch}":</h3>
                    <ul>
                        {results.map((result, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelectLocation(result.lat, result.lon)}
                                className='cursor-pointer hover:border hover:border-white p-4 text-white relative group h-16'
                            >
                                {result.name}, {result.state || result.fullCountryName}, {result.fullCountryName}
                                <span className='absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity'>
                                    &gt;
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
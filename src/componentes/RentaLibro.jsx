import React, { useState } from 'react';
import { TablaLibro } from './TablaLibro';
export const RentaLibro = () => {

    const [inicioReserva, setInicioReserva] = useState('');
    const [finReserva, setFinReserva] = useState('');
    const [error, setError] = useState('');

    const handleInicioReservaChange = (e) => {
        const diaInicio = parseInt(e.target.value);
        setInicioReserva(diaInicio);
        setError('');

        if (finReserva && diaInicio >= finReserva) {
            setFinReserva('');
        }
    };

    const handleFinReservaChange = (e) => {
        const diaFin = parseInt(e.target.value);
        setFinReserva(diaFin);
        setError('');

        if (diaFin <= inicioReserva) {
            setError('El día final debe ser mayor que el día de inicio');
        }
    };

    return (
        
       
        <div>
            
            <form>
                <div className="form-floating">

                    <select class="form-select" id="inicioReserva" value={inicioReserva} onChange={handleInicioReservaChange} >
                        <option value="">Selecciona un día</option>
                        {Array.from({ length: 30 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                    <label for="floatingSelect">Dia Inicial</label>
                </div>
                <br />

                <div className="form-floating" >
                <select class="form-select" id="finReserva" value={finReserva} onChange={handleFinReservaChange} disabled={!inicioReserva}>
                    <option value="">Selecciona un día</option>
                    {Array.from({ length: 30 }, (_, index) => {
                        const dia = index + 1;
                        if (dia > inicioReserva) {
                            return <option key={dia} value={dia}>{dia}</option>;
                        }
                        return null;
                    })}
                </select>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    );

}

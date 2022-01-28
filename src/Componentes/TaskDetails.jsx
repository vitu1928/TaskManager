import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import Button from './Button.jsx';

import './styles/TaskDetails.css'

export default function TaskDetails() {
    const params = useParams();
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate('/')
    }
    return (
        <>
            <div className="back-button-container">
                <Button onClick={handleBackButtonClick}>Voltar</Button>
            </div>
            <div className="task-details-container">
                <h2>{params.taskTitle}</h2>
                <p> 
                    lorem ipsum, dolor sit amet consetctetuslfkdj asçldfk jasdlçfjk asdçlfkj asdlfkjas df asdf 
                </p>
            </div>
        </>
    );
};


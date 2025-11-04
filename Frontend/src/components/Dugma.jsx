import React, { useState } from 'react';

const Dugma = () => {

    const [value, setValue] = useState(0);
    const handleClick = () => {
        setValue(value + 1);
    };
    return (

        <div>
            <img src={bgImg} alt="Background" />
            <h1>ברוכים הבאים לאפליקציה שלנו!</h1>
            <p>התחילו להוסיף לקוחות חדשים.</p>
            <p>המספר הנוכחי</p>
            <button onClick={handleClick}הגדל></button>
        </div>
    );
}
export default Dugma;
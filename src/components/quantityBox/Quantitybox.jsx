import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Quantitybox = ({ inputValue, onChange }) => {
    
    const plus = () => {
        onChange(inputValue + 1);
    };

    const minus = () => {
        if (inputValue > 1) {
            onChange(inputValue - 1);
        }
    };

    return (
        <div className="addCartSection pt-2 pb-4 d-flex align-items-center">
            <div className="counterSec mr-3">
                <input type="number" value={inputValue} readOnly />
                <span className="arrow plus" onClick={plus}>
                    <KeyboardArrowUpIcon />
                </span>
                <span className="arrow minus" onClick={minus}>
                    <KeyboardArrowDownIcon />
                </span>
            </div>
        </div>
    );
};

export default Quantitybox;

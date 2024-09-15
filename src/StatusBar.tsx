import React, { useState } from 'react';
import './StatusBar.css';
import status from "./assets/status.svg" 
import studying from "./assets/studying.svg"
import eating from "./assets/eating.svg"
import chilling from "./assets/chilling.svg"

function Dropdown(){
    const [open, setOpen] = useState(false);

    return (
        <div className="dropdown-container">
            <label htmlFor="status-dropdown" className="dropdown-label">
                SET STATUS
            </label>

            <div className="status-trigger" onClick={()=>{setOpen(!open)}}>
                <img src={status}/>
            </div>

            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                <ul>
                    <DropdownItem img= {studying} text = {"Studying"} id="status-icon"/>
                    <DropdownItem img= {eating} text = {"Eating"} id="status-icon"/>
                    <DropdownItem img= {chilling} text = {"Chilling"} id="status-icon"/>
                </ul>
            </div>

            
        </div>   
        );
};

interface DropdownItemProps {
    id?: string;
    img: string;
    text: string;
}

function DropdownItem(props: DropdownItemProps) {
    return(
        <li className='dropdownItem' id={props.id}>
            <img src={props.img}></img>
            <span>{props.text}</span>
        </li>
    );
}

export default Dropdown;
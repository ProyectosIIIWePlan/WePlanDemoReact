import React from 'react';
import './Tickets.css';

const Tickets = ({ tickets }) => {

    return (
        <div id="ticketsDisplay">
            {tickets.map((ticket, index) => (
                <div key={index} className="ticket">
                    <div className="title">{ticket.nombre ?? ticket.tipo ?? null}</div>
                    <div className="day">{ticket.entrada ?? ticket.fecha ?? null}</div>
                    {/*<div className="description">{ticket.description}</div>*/}
                    <img className={`typeLogo ${ticket.logoType}`} src={ticket.logoSrc} alt="ticket type"/>
                    <div className="company"></div>
                    {/*<div className="time">{ticket.time}</div>*/}
                </div>
            ))}
        </div>
    );
};

            export default Tickets;
import React from 'react';
import './Tickets.css';

const Tickets = ({ tickets }) => {

    return (
        <div id="ticketsDisplay">
            {tickets.map((ticket, index) => (
                <div key={index} className="ticket">
                    <div className="title">{ticket.route}</div>
                    <div className="day">{ticket.date}</div>
                    <div className="description">{ticket.description}</div>
                    <img className={`typeLogo ${ticket.logoType}`} src={ticket.logoSrc} alt="ticket type"/>
                    <div className="company">{ticket.operator}</div>
                    <div className="time">{ticket.time}</div>
                </div>
            ))}
        </div>
    );
};

            export default Tickets;
import React from 'react';
import './Tickets.css';
import Ticket from '../../assets/LogoTypeTicket.png'
import Bed from '../../assets/LogoTypeBed.png'

const Tickets = ({ tickets }) => {

    return (
        <div id="ticketsDisplay">
            {tickets.map((ticket, index) => (
                <div key={index} className="ticket">
                    <div className="title">{ticket.nombre ?? ticket.tipo ?? null}</div>
                    <div className="day">{ticket.entrada ?? ticket.fecha ?? null}</div>
                    {/*<div className="description">{ticket.description}</div>*/}
                    <img className={`typeLogo ${ticket.logo}`} src={ticket.logo == "ticket" ? Ticket : Bed} alt="ticket type"/>
                    <div className="company"></div>
                    {/*<div className="time">{ticket.time}</div>*/}
                </div>
            ))}
        </div>
    );
};

            export default Tickets;
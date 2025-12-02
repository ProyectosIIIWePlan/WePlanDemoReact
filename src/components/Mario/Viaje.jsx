import React from 'react'
import Tickets from './Tickets.jsx'
import './Viaje.css'
import lock from '../../assets/PremiumLock.png'

const Viaje= React.forwardRef(({ data }, ref) => {

    return (
        <div ref={ref} id={"m-viaje"}>
            <section className="m-tripTicketsSection">
                <div id="m-tripContent">
                    <div className="title underline">Tickets</div>
                    <div id="m-tripTimeline">
                        <Tickets tickets={data} />
                    </div>
                </div>
            </section>
            <section className="m-tripItinerarySection">
                <div className="title underline">Itinerario</div>
                <div className="m-tripItineraryCard">
                    <div className="m-tripLockContainer">
                        <img className="m-tripLockIcon" src={lock} alt="lock" />
                        <span className="m-tripLockText">Unlock with premium</span>
                    </div>
                </div>
            </section>
        </div>
    )
})

export default Viaje
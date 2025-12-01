import React from 'react'
import Tickets from './Tickets.jsx'
import './Viaje.css'

const Viaje= React.forwardRef(({ data }, ref) => {


    // bus bed plane
    const tickets = [
        {
            date: 'Miércoles 24 Dic',
            time: '07:00',
            route: 'AVI - MAD',
            description: 'Asiento 12A, Clase Turista',
            logoType: 'bus',
            logoSrc: "/src/assets/LogoTypeBus.png",
            operator: 'ALSA'
        },
        {
            date: 'Jueves 25 Dic',
            time: '08:30',
            route: 'MAD - VAL',
            description: 'Asiento 12A, Clase Turista',
            logoType: 'bus',
            logoSrc: "/src/assets/LogoTypeBus.png",
            operator: 'ALSA'
        },
        {
            date: 'Viernes 26 Dic',
            time: '10:00',
            route: 'MAD - BAR',
            description: 'Asiento 12A, Clase Turista',
            logoType: 'bus',
            logoSrc: "/src/assets/LogoTypeBus.png",
            operator: 'ALSA'
        }
    ];

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
                        <img className="m-tripLockIcon" src="/src/assets/PremiumLock.png" alt="lock" />
                        <span className="m-tripLockText">Unlock with premium</span>
                    </div>
                </div>
            </section>
        </div>
    )
})

export default Viaje
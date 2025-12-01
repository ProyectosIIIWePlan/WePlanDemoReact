import React from 'react'
import './Bote.css'

const Bote = React.forwardRef(({  }, ref) => {

    const data = [
        [{
            number: '1234 5678 9012 3456',
            expireDate: '12/26',
        }],
        [
            {
                date: '01/15/2024',
                amount: '50.00€',
                description: 'Visita al museo'
            },
            {
                date: '02/10/2024',
                amount: '30.00€',
                description: 'Snacks'
            }
        ]
    ];

    return (
        <div ref={ref} id={"m-bote"}>
            <div className={"title underline"}>Tarjeta Virtual</div>
            <div id={"m-potCard"}>
                {data[0].map((card, index) => (
                    <div key={index} className="m-potCardContent">
                        <div className="m-potCardNumber">{card.number}</div>
                        <div className="m-potCardName">{card.name}</div>
                        <div className="m-potCardExpire">Valido hasta el {card.expireDate}</div>
                    </div>
                ))}
            </div>
            <div className={"title underline"}>Historial de Pagos</div>
            <div id={"m-potHistory"}>
                {data[1].map((entry, index) => (
                    <div key={index} className="m-potHistoryEntry">
                        <div>
                            <div className="m-potHistoryDate">{entry.date}</div>
                            <div className="m-potHistoryAmount">{entry.amount}</div>
                        </div>
                        <div>
                            <div className="m-potHistoryDescription">{entry.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
})

export default Bote
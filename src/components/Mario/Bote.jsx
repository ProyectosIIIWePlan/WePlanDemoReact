import React, {useEffect} from 'react'
import './Bote.css'

const Bote = React.forwardRef(({ data }, ref) => {

    /*const data = [
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
    ];*/

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div ref={ref} id={"m-bote"}>
            <div className={"title underline"}>Tarjeta Virtual</div>
            <div id={"m-potCard"}>
                {data[0]?.map((card, index) => (
                    <div key={index} className="m-potCardContent">
                        <div className="m-potCardNumber">{card.number}</div>
                        <div className="m-potCardName">{card.money}€</div>
                        <div className="m-potCardExpire">Valido hasta el {card.expireDate}</div>
                    </div>
                )) ?? null}
            </div>
            <div className={"title underline"}>Historial de Pagos</div>
            <div id={"m-potHistory"}>
                {data[1]?.map((entry, index) => (
                    <div key={index} className="m-potHistoryEntry">
                        <div>
                            <div className="m-potHistoryDate">{entry.date}</div>
                            <div className="m-potHistoryAmount">{entry.amount}</div>
                        </div>
                        <div>
                            <div className="m-potHistoryDescription">{entry.description}</div>
                        </div>
                    </div>
                )) ?? <div id={"m-noHistory"}>Aún no se ha realizado ninguna compra con esta tarjeta</div>}
            </div>
        </div>
    )
})

export default Bote
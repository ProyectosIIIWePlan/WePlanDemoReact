import ProgressCircle from './ProgressCircle.jsx'
import React, { useState, useEffect, useRef } from 'react'
import './PayPool.css'

const PayPool = React.forwardRef(({ payTotal, nPersonas, onAllPaid }, ref) => {
    const [count, setCount] = useState(0)
    const [payCount, setPayCount] = useState(payTotal / nPersonas)


    const payBlock = useRef(null);
    const payTitle = useRef(null);
    const payButton = useRef(null);
    const payPart = useRef(null);
    const payAll = useRef(null);

    useEffect(() => {
        if(payCount === 0){
            payTitle.current.textContent=`Faltan ${(100 - count) * nPersonas / 100} personas por pagar`
        }
    }, [count])

    const PayPart = () => {
        let c = count + (100 / nPersonas)
        if (c > 100) c = 100
        setCount(c)
        payTitle.current.style.color="var(--c-norm-4)"
        payButton.current.textContent="Pagado"
        payButton.current.disabled=true
        setPayCount(0)

        if (c == 100){
            payPart.current.disabled=true
            payAll.current.disabled=true
            setTimeout(transition, 500)
        }
        else payPart.current.style.display = "block"
    }

    const PayAll = () => {
        PayPart()
        setCount(100)
        payTitle.current.textContent=`!Pago completado!`
        payPart.current.disabled=true
        payAll.current.disabled=true
        setTimeout(transition, 1000)
    }

    const transition = () => {
        onAllPaid()
    }

    return (
        <div id={"m-payPool"} ref={ref}>
            <ProgressCircle percent={count} debt={payCount} />
            <div id={"m-pay"}>
                <h2 ref={payTitle}>!Tienes {payCount}€ pendientes por pagar!</h2>
                <button ref={payButton} onClick={PayPart}>Pagar Ahora</button>
                <button ref={payPart} onClick={PayPart}>Pagar Parte</button>
                <button ref={payAll} onClick={PayAll}>Pagar Todo</button>
            </div>
        </div>
    )
})

export default PayPool
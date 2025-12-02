import ProgressCircle from './ProgressCircle.jsx'
import React, {useState, useEffect, useRef, use} from 'react'
import './PayPool.css'

const PayPool = React.forwardRef(({ payTotal, nPersonas, startState, onAllPaid, onStateChange }, ref) => {
    const [count, setCount] = useState(0)
    const [payCount, setPayCount] = useState(0)
    const [payDone, setPayDone] = useState(false);
    const [payEnded, setPayEnded] = useState(false);

    const payTitle = useRef(null);
    const payButton = useRef(null);
    const payPart = useRef(null);
    const payAll = useRef(null);

    const FirstPay = () => {
        payTitle.current.style.color="var(--c-norm-4)"
        payButton.current.textContent="Pagado"
        payButton.current.disabled=true

        setPayDone(true)
    }

    useEffect(() => {
        if (startState != null){
            setCount(startState)
            if (startState === 100){
                PayAll()
            }
            else if (startState > 0){
                FirstPay()
                payPart.current.style.display = "block"
            }
        }
    }, [startState])

    useEffect(() => {
        if (payTotal != null && nPersonas != null){
            setPayCount(payTotal / nPersonas)
            if (payTotal / nPersonas === 0 || nPersonas === 0){
                PayAll()
            }
        }
    }, [payTotal, nPersonas]);

    useEffect(() => {
        if (startState != null) onStateChange(count);
    }, [count])

    const PayPart = () => {
        let c = count + (100 / nPersonas)
        if (c > 100) c = 100
        setCount(c)
        FirstPay()

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
        setPayEnded(true)
        payPart.current.disabled=true
        payAll.current.disabled=true
        setTimeout(transition, 1000)
    }

    const transition = () => {
        onAllPaid()
    }

    return (
        <div id={"m-payPool"} ref={ref}>
            <ProgressCircle percent={Math.floor(count)} />
            <div id={"m-pay"}>
                <h2 ref={payTitle}>
                    {payEnded ? "!Pago completado!" :
                        (payDone) ? (Math.round((100 - count) * nPersonas / 100) === 1 ?
                                `Falta 1 persona por pagar` : `Faltan ${Math.round((100 - count) * nPersonas / 100)} personas por pagar`) :
                            `!Tienes ${(payCount).toFixed(2)}€ pendientes por pagar!`}
                </h2>
                <button ref={payButton} onClick={PayPart}>Pagar Ahora</button>
                <button ref={payPart} onClick={PayPart}>Pagar Parte</button>
                <button ref={payAll} onClick={PayAll}>Pagar Todo</button>
            </div>
        </div>
    )
})

export default PayPool
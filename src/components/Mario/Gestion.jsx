import { useRef } from 'react'
import Navbar from './NavBar.jsx'
import PayPool from './PayPool.jsx'
import Viaje from "./Viaje.jsx";
import Bote from "./Bote.jsx";
import './Gestion.css'

function Gestion({ payTotal, nPersonas, admin, isTrip }) {
    const payPool = useRef(null)
    let ref = useRef(null)
    const BoteRef = useRef(null)
    const ViajeRef = useRef(null)

    const onAllPaid = () => {
        if (payPool.current){
            payPool.current.style.transition = ".5s"
            payPool.current.style.opacity = 0
            setTimeout(() => {
                payPool.current.style.display = "none";

                if(isTrip) { if(ViajeRef.current) ref = ViajeRef }
                else if(BoteRef.current) ref = BoteRef

                ref.current.style.display = "flex"

            }, 600)
        }
        else console.log("a")

    }

    return (
        <div id={"gestion"}>
            <Navbar admin={admin}></Navbar>
            <PayPool ref={payPool} payTotal={payTotal} nPersonas={nPersonas} onAllPaid={onAllPaid} ></PayPool>
            {isTrip ?
                (<Viaje ref={ViajeRef} />):
                (<Bote ref={BoteRef} />)}
        </div>
    )
}

export default Gestion
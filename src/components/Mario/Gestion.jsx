import {useRef} from 'react'
import Navbar from './NavBar.jsx'
import PayPool from './PayPool.jsx'
import Viaje from "./Viaje.jsx";
import Bote from "./Bote.jsx";
import './Gestion.css'

function Gestion({ name, payTotal, nPersonas, startState, admin, isTrip, saveState, groupId, data }) {
    const payPool = useRef(null)
    let ref = useRef(null)
    const BoteRef = useRef(null)
    const ViajeRef = useRef(null)

    const onStateChange = (state) => {saveState(state);}

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
    }

    return (
        <div id={"gestion"}>
            <Navbar gestName={name} admin={admin} groupId={groupId}></Navbar>
            <PayPool ref={payPool} startState={startState ?? null} payTotal={payTotal} nPersonas={nPersonas} onAllPaid={onAllPaid} onStateChange={onStateChange}></PayPool>
            {isTrip ?
                (<Viaje ref={ViajeRef} data={data} />):
                (<Bote ref={BoteRef} data={data} />)}
        </div>
    )
}

export default Gestion
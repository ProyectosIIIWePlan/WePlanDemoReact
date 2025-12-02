import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Gestion from "./Gestion.jsx";

function LoadGestion() {
    const { groupId, gestId } = useParams();
    const skipSaveRef = useRef(false);
    const [gestion, setGestion] = useState([]);
    const [state, setState] = useState(0);
    const [isTrip, setIsTrip] = useState(true);
    const [data, setData] = useState([]);

    const saveState = (newState) => {
        setState(newState);
    }

    // cargar en localStorage
    useEffect(() => {
        skipSaveRef.current = true;
        const allGest = JSON.parse(localStorage.getItem(`gestiones_${groupId}`)) || [];
        const currentGest = allGest.find(g => g.id === Number(gestId)); // o como tengas el id
        setGestion(currentGest);
        setIsTrip(currentGest.tipo == 'viaje');
        if (currentGest.tipo == 'viaje') {
            const hoteles = currentGest.hoteles;
            hoteles.forEach(hotel => {
                hotel.logoType = 'bed';
                hotel.logoSrc = '/src/assets/LogoTypeBed.png'
            })
            const transportes = currentGest.transportes;
            transportes.forEach(trans => {
                trans.logoType = 'ticket';
                trans.logoSrc = '/src/assets/LogoTypeTicket.png'
            })
            setData(hoteles.concat(transportes));
            console.log(hoteles.concat(transportes));
        }
        else{
            const d= [[{
                number: '1234 5678 9012 3456',
                money: currentGest.cantidadTotal,
                expireDate: '12/26',
            }]];
            setData(d)
            console.log(d)
        }


        console.log(currentGest);

        const save_state = JSON.parse(localStorage.getItem(`state_${groupId}_${gestId}`)) || [];
        setState((save_state.state == []) ? 0 : save_state.state);


    }, [groupId, gestId]);

    // guardar en localStorage
    useEffect(() => {
        if (skipSaveRef.current) {
            skipSaveRef.current = false;
            return;
        }
        localStorage.setItem(`state_${groupId}_${gestId}`, `{"state":${(state == undefined) ? 0 : state}}`);

    }, [state, groupId, gestId]);


    return(
      <>
          <Gestion name={gestion.nombre ?? null} groupId={groupId} startState={state} payTotal={gestion.costeTotal ?? null} nPersonas={gestion.participantes?.length ?? 0} admin={true} isTrip={isTrip} saveState={saveState} data={data}/>
      </>
    );
}

export default LoadGestion;
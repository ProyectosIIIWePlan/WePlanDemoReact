import { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import "./Navbar.css"
import BackArrow from '../../assets/LeftArrow.png'

function Navbar({ admin, gestName, groupId, arrow=true }) {
    const navigate = useNavigate();
    const navbarContainer = useRef(null);
    const permText = useRef(null);
    const permBg = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        if (admin) {
            if (permBg.current) permBg.current.style.backgroundColor = "var(--c-high-4)";
            if (navbarContainer.current){
                //navbarContainer.current.style.backgroundColor = "var(--c-high-7)";
                navbarContainer.current.style.borderBottom = "4px solid var(--c-high-4)";
            }
            if (permText.current) {
                permText.current.textContent = "Admin";
                permText.current.style.color = "var(--c-high-7)";
            }
        }

        if (admin == null){
            titleRef.current.style.width = "100%";
        }
        else{
            titleRef.current.style.width = "";
        }
    }, [admin]);

    useEffect(() => {
        if (!arrow){
            titleRef.current.style.textAlign = "center";
            titleRef.current.style.marginLeft = "50px";
        }

    }, [arrow])

    return (
        <div id={"m-navRoot"}>
            <div id={"m-navbar"} ref={navbarContainer}>
                <div ref={titleRef}>
                    {
                        arrow ?
                        <img src={BackArrow} alt={"back arrow"} onClick={() => navigate(groupId != null ? `/gestiones/${groupId}` : `/`)} />
                        : null
                    }
                    <p>{gestName}</p>
                </div>
                {admin != null ? <div>
                     <div id={"m-perms"} ref={permBg}><h2 ref={permText}>Member</h2></div>
                </div> : null}
            </div>
        </div>
    )
}

export default Navbar
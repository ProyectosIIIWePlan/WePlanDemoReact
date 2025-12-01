import { useEffect, useRef } from 'react'
import "./Navbar.css"
import BackArrow from '/src/assets/LeftArrow.png'

function Navbar({ admin }) {
    const navbarContainer = useRef(null);
    const permText = useRef(null);
    const permBg = useRef(null);

    useEffect(() => {
        if (admin) {
            if (permBg.current) permBg.current.style.backgroundColor = "var(--c-high-3)";
            if (navbarContainer.current){
                navbarContainer.current.style.backgroundColor = "var(--c-high-7)";
                navbarContainer.current.style.borderBottom = "4px solid var(--c-high-3)";
            }
            if (permText.current) {
                permText.current.textContent = "Admin";
                permText.current.style.color = "var(--c-high-7)";
            }
        }
    }, [admin]);

    return (
        <div id={"m-navRoot"}>
            <div id={"m-navbar"} ref={navbarContainer}>
                <div>
                    <img src={BackArrow} alt={"back arrow"} />
                    <p>Nombre del grupo</p>
                </div>
                <div>
                    <div id={"m-perms"} ref={permBg}><h2 ref={permText}>Member</h2></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
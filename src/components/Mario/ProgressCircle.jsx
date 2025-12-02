import './ProgressCircle.css'
import { useRef } from 'react'

export default function ProgressCircle({ percent }) {
    const clamped = Math.max(0, Math.min(100, percent))
    const offsetExpr = `calc(2 * 3.1415 * 40% * ${(100 - clamped) / 100})`
    const circleBg = useRef(null)
    const circleProgress = useRef(null)
    const percentage = useRef(null)

    return (
        <div id={"moneyPool"}>
            <div id="progress-circle">
                <svg>
                    <circle ref={circleBg} className="bg" cx="50" cy="50" r="50"></circle>
                    <circle
                        ref={circleProgress}
                        className="progress"
                        cx="50"
                        cy="50"
                        r="50"
                        style={{ strokeDashoffset: offsetExpr }}
                    ></circle>
                </svg>
                <div id="percentage">
                    <p ref={percentage}>{clamped}%</p>
                </div>
            </div>
        </div>
    )
}
import React from "react"

export default function Die(props) {
    return (
        <div className={props.isHeld ? "held" :"die"} onClick={props.hold}>
            <button>{props.value}</button>
        </div>
    )
}
import React from "react"

export default function Timer(props) {
    const [sec, setSec] = React.useState(0)
    const [min, setMin] = React.useState(0)

    let timer;

    React.useEffect(() => {
       
        if (props.reset) {
            setSec(0)
            setMin(0)
            props.setReset(false)
        }
        timer = setInterval(() => {
            
            setSec(sec => sec + 1);
    
            if(sec == 59)
            {
                setMin(min => min +1);
                setSec(0);
            }
        }, 1000)
        if (props.tenzies) {
            clearInterval(timer)
        }
        return function Callback() {
            clearInterval(timer)
        }
    })

    return(
        <div className="timer">
            <p>time : {min}min{sec}s </p>
        </div>
    )
}
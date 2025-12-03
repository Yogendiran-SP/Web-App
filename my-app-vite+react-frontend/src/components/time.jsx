import {useState, useEffect} from "react"
import './time.css'

function Time(){
    const [greeting, setGreeting] = useState("")

    useEffect(() => {
        const hour = new Date().getHours()

        if(0<=hour && hour<3){setGreeting("Midnight")}
        else if(3<=hour && hour<6){setGreeting("Early Morning")}
        else if(6<=hour && hour<12){setGreeting("Morning")}
        else if(hour===12){setGreeting("Noon")}
        else if(12<hour && hour<16){setGreeting("AfterNoon")}
        else if(16<=hour && hour<19){setGreeting("Evening")}
        else if(19<=hour && hour<22){setGreeting("Night")}
        else if(22<=hour && hour<0){setGreeting("Late Night")}
    }, [])

    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)

        return () => clearInterval(timer)
    }, [])
    
    return (
    <div className="clock">
        <h2>{greeting}<br/>{time}</h2>
    </div>
    )
}

export default Time
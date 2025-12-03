import {useState, useEffect, useRef} from "react"
import './clockwidget.css'

function ClockWidget(){
    const [greeting, setGreeting] = useState("")
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    const widgetRef = useRef(null)
    const position = useRef({x: 20, y:20})
    const offset = useRef({x: 0, y:0})
    const isDragging = useRef(false)

    useEffect(() => {
        const hour = new Date().getHours()

        if (hour >= 0 && hour < 3) setGreeting("Midnight")
        else if (hour >= 3 && hour < 6) setGreeting("Early Morning")
        else if (hour >= 6 && hour < 12) setGreeting("Morning")
        else if (hour === 12) setGreeting("Noon")
        else if (hour > 12 && hour < 16) setGreeting("AfterNoon")
        else if (hour >= 16 && hour < 19) setGreeting("Evening")
        else if (hour >= 19 && hour < 22) setGreeting("Night")
        else setGreeting("Late Night")
    }, [time])

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const startDrag = (e) => {
        isDragging.current = true
        offset.current.x = e.clientX - position.current.x
        offset.current.y = e.clientY - position.current.y;
    }

    const onDrag = (e) => {
        if(!isDragging.current) return
        position.current.x = e.clientX - offset.current.x
        position.current.y = e.clientY - offset.current.y
        
        widgetRef.current.style.left = `${position.current.x}px`
        widgetRef.current.style.top = `${position.current.y}px`
    }

    const stopDrag = () => {
        isDragging.current = false
    }

    return (
    <div
        className="clock-widget"
        ref={widgetRef}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
    >
        <h2>{greeting}</h2>
        <h3>{time}</h3>
    </div>
    )
}

export default ClockWidget
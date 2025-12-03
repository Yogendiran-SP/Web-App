import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import '../components/style.css'
// import Time from "../components/time.jsx"
import ClockWidget from "../components/clockwidget.jsx"
import {Greeting, StudentCard, Card, ButtonComp, Footer, UserList} from "../components/helper.jsx"

export default function Home(){
    const [count, setCount] = useState(0)
    function showmessage(data){
      alert("Hello from button "+data)
    }

    return (
    <div className="background">
    <div>
      {/* <Time /> */}
      <ClockWidget />
    </div>
    <div>
      <h1 className="header"><strong>Welcome to my React app</strong></h1>
      {/* <div className="top-section">
        <StudentCard student={{name: "Joshua", age: 18, rollno: 123456, active: true}}/>
        <Card title="About">
          This is the about paragraph of the children card
        </Card>
      </div>
      <div className="middle-section">
        <Greeting name="Joshua" />
        <ButtonComp onButtonClick={showmessage}/>
        <UserList />
      </div>
      <div className="bottom-section">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      <Footer />
    </div>
    </div>
    )
}
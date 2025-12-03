import {useState, useEffect} from "react"

export function Greeting({name}){
    return <h3>Hello, {name}!</h3>
}

export function StudentCard({student}){
    return (
        <>
            <h3>{student.regno}</h3>
            <div>
                <ul>Name: {student.name}</ul>
                <ul>Age: {student.age}</ul>
                <ul>Rollno: {student.rollno}</ul>
                <ul>Active: {student.active ? 'Yes' : 'No'}</ul>
            </div>
        </>
    )
}

export function Card({title, children}){
    return (
        <div>
            <h3>{title}</h3>
            <h4>{children}</h4>
        </div>
    )
}

export function ButtonComp({onButtonClick}){
    return (
        <button onClick={()=>onButtonClick("from Child")}>Click here</button>
    )
}

export function Footer(){
    return (
        <footer className="footer">
            <div>
                <p>© {new Date().getFullYear()} My React App. All rights reserved.</p>
            </div>
        </footer>
    )
}

export function UserList(){
    const [users, setUsers] = useState([])

    useEffect( () => {
        console.log("User changed")
    }, [users])

    return (
        <div>
            <h3>Users List</h3>
            {users.map(user => <ul key={user.id}>{user.name}</ul>)}
        </div>
    )
}

export function DisplayName(){
    const [name, setName] = useState("")
    const [displayName, setDisplayName] = useState("")
    
    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => setDisplayName(name)}>Show Name</button>
            <h3>Good {}</h3>
        </div>
    )
}
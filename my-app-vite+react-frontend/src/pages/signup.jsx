import {useState} from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios.js"

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault()
        try{
            const res = await api.post("/auth/signup", form)
            console.log("Signup success: ", res.data)
            alert("Signup Successful!")
            navigate("/login")
        } catch (err) {
            console.error(err.response?.data)
            alert("Signup failed!")
        }
    }

    return (
        <div style={{ padding: "20px"}}>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input 
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                />
                <br /> <br />
                <input 
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <br /> <br />
                <input 
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <br /> <br />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}
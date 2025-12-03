import {useState} from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios.js"

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const res = await api.post("/auth/login", form)
            localStorage.setItem("token", res.data.access_token)
            alert("Login uccessful!")
            navigate("/home")
        } catch (err) {
            console.error(err.response?.data)
            alert("Login failed!")
        }
    }

        return (
        <div style={{ padding: "20px"}}>
            <form onSubmit={handleLogin}>
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
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <br /> <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
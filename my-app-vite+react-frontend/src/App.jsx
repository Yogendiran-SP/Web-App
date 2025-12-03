import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Signup from "./pages/signup.jsx"
import Login from "./pages/login.jsx"
import Home from "./pages/home.jsx"

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome</h1>
        <p>Please login or signup to continue.</p>

        <div className="buttons">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/signup"><button>Signup</button></Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route 
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
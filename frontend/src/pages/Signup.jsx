const Signup = () =>{

    return (
    <>
        <div className="container">
    
            <div id="signup-form" className="form-container">
                <h2>Sign Up</h2>
                <input type="text" id="signup-username" placeholder="Username" required/>
                <input type="email" id="signup-email" placeholder="Email" required/>
                <input type="password" id="signup-password" placeholder="Password" required/>
                <button onclick="signup()">Sign Up</button>
                <p>Already have an account? <a href="#" onclick="showLogin()">Login</a></p>
            </div>
        </div>

    
    
    </>
    )
    
}


export default Signup;
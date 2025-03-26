const Login = () =>{

        return (
        <>
            <div className="container">
                <div id="login-form" className="form-container active">
                    <h2>Login</h2>
                    <input type="text" id="login-username" placeholder="Username" required/>
                    <input type="password" id="login-password" placeholder="Password" required/>
                    <button onclick="login()">Login</button>
                    <p>Don't have an account? <a href="#" onclick="showSignup()">Sign Up</a></p>
                </div>

            
            </div>

        
        
        </>
        )
        
}

export default Login;
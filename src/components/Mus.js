import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAll } from "../store/action/action";
import API_URL from "../service";
import { useNavigate } from "react-router-dom";
 
export default function LoginForm() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  useEffect(()=>{
    if(users !== null && users !== undefined){
      if(users.signin !== null && users.signin !== undefined){
 
      }
    }
  },[users])
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
  
    
    const data = {
      email: email,
      password: password,
    };
 
    
    dispatch(loginAll(API_URL, data));
     navigate("/dashboard");
    
  }
  return (
    <>
    
   <section class="vh-100" style={{backgroundColor: "#F4F7Fc" ,overflow:'hidden'}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
       
        <div class="card" style={{borderRadius: "1rem"}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" class="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">
 
                <form onSubmit={handleSubmit}>
 
                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span class="h1 fw-bold mb-0">Login Form</span>
                  </div>
 
                  {/* <h5 class="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5> */}
 
                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example17" placeholder='Email address' class="form-control form-control-lg" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {/* <label class="form-label" for="form2Example17">Email address</label> */}
                  </div>
 
                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example27" placeholder='Password' class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {/* <label class="form-label" for="form2Example27">Password</label> */}
                  </div>
 
                  <div class="pt-1 mb-4 ">
                    <button class="btn btn-dark btn-lg btn-block bg-dark  " type="submit" style={{marginRight:'30px'}}>Login as Employee</button>
                    <button class="btn btn-dark btn-lg btn-block bg-dark " type="button">Login as Admin</button>
                  </div>
 
                  <a class="small text-muted" href="#!">Forgot password?</a>
                  {/* <p class="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="#!"
                      style={{color: "#393f81"}}>Register here</a></p> */}
                  {/* <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a> */}
                </form>
 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  );
}
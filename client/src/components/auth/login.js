import React,{useState} from "react";

const Login = ()=>{

    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });
    const {email,password} = formData;
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
    };
    return(
        <div className="section" onSubmit={e=>onSubmit(e)}>
            <div className='page-title-wrapper'>
                <h2 className='page-title'>Login</h2>
            </div>
            <form >
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email" name="email" value={email}  onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" name="password" value={password}  onChange={e => onChange(e)}/>
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox"/> Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default Login;

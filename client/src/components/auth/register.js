import React,{useState} from "react";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";

const Register = ({setAlert,register})=>{

    const [formData, setFormData] = useState({
        name:'asd',
        email:'googlapideveloper@gmail.com',
        password:'asd',
        password2:'asd'
    });
    const {name,email,password,password2} = formData;
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = (e)=>{
        e.preventDefault();
        if(password!==password2){
            setAlert("Password didn't match","danger");
        }else{
            register(name,email,password);
        }
    };
    return(
        <div className="section" onSubmit={e=>onSubmit(e)}>
            <div className='page-title-wrapper'>
                <h2 className='page-title'>Register</h2>
            </div>
            <form >
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email" name="email" value={email}  onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" name="password" value={password}  onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Retype Password:</label>
                    <input type="password" className="form-control" id="pwd2" name="password2" value={password2}  onChange={e => onChange(e)} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

const mapDispatchAction = {
    setAlert,
    register
};

export default connect(null,mapDispatchAction) (Register);



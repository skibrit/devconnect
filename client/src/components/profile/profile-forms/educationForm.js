import React,{useState,forwardRef} from "react";
import Rodal from "rodal";
import {connect} from "react-redux";
import 'rodal/lib/rodal.css';
import {closeModal} from "../../../actions/global";
import {EDUCATION_FORM} from "../../../actions/constants";
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';

const EducationForm = ({shoulShowModal,closeModal},fRef)=>{
    const [formData,setFormData] = useState({
        degree:"",
        school:"",
        fieldOfStudy:"",
        from:"",
        to:"",
        current:"",
        description:""
    });

    const {degree,school,fieldOfStudy,from,to,current,description} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
    };

    return(
        <Rodal visible={shoulShowModal} onClose={()=>{
            closeModal(EDUCATION_FORM)
        }} width={800} height={650} >
            <div className="modal-wrapper">
                <div className="modal-title-wrapper">
                    <h4 className="modal-title">Add Education</h4>
                </div>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="degree" name="degree" value={degree} onChange={e => onChange(e)}
                               placeholder="Degree" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="school" name="school" value={school} onChange={e => onChange(e)}
                               placeholder="School" required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="fieldOfStudy" name="fieldOfStudy" value={fieldOfStudy} onChange={e =>
                            onChange(e)} placeholder="Field of Study" required/>
                    </div>
                    <div className="form-group">
                        <div>
                            <DayPickerInput component={props =>
                                <input className="form-control" id="ex-from" name="from" {...props} autoComplete="off"
                                       placeholder="From" onChange={e =>
                                    onChange(e)} required/>}/>
                        </div>
                        <span className='input-clue'>The start date of your education</span>
                    </div>
                    <div className="form-group">
                        <div>
                            <DayPickerInput component={props =>
                                <input className="form-control" id="ex-to" name="to" {...props} autoComplete="off" placeholder="To" onChange={e =>
                                    onChange(e)}/>}/>
                        </div>
                        <span className='input-clue'>The end date of your education</span>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="currentEducation" name="current" onChange={e => onChange(e)}/>
                            <label for="currentEducation" className="custom-control-label">Ongoing</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" id="ex-description" name="description"
                                  onChange={e => onChange(e)} placeholder="Description">
                        </textarea>
                    </div>
                    <div className="form-group form-btn-wrapper">
                        <button type="submit" className="btn btn-primary" onSubmit={()=>{
                            onSubmit();
                        }}>Add</button>
                    </div>
                </form>
            </div>
        </Rodal>
    )
};

const mapStateToProps = (state)=>({
    shoulShowModal:state.globalStates.openModal.indexOf(EDUCATION_FORM)>-1?true:false
});

const mapDispatchToProps = {
    closeModal
};

export default connect(mapStateToProps,mapDispatchToProps,null,{ forwardRef: true })(forwardRef(EducationForm));

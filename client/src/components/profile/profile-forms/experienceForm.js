import React,{useState,useEffect,useRef} from "react";
import Rodal from "rodal";
import {connect} from "react-redux";
import 'rodal/lib/rodal.css';
import {closeModal} from "../../../actions/global";
import {EXPERIENCE_FORM} from "../../../actions/constants";
import DatePicker from "react-datepicker";
import {compareDate} from "../../../utils/DateUtill";
import Alert from "../../layouts/alert/alert";
import "react-datepicker/dist/react-datepicker.css";

const ExperienceForm = ({shoulShowModal,closeModal,submitHandler,setAlert})=>{

    let autoCompleteField = useRef(null);

    const [formData,setFormData] = useState({
        title:"",
        company:"",
        location:"",
        from:"",
        to:"",
        current:"",
        description:""
    });
    const handlePlaceChanged = (autoComplete)=>{
        const place = autoComplete.getPlace();
        setFormData((prevState)=>{
            console.log(prevState);
            return {...prevState,location:place.formatted_address};
        })
    };
    useEffect(()=>{
        const callApi = async ()=>{
            try{
                setTimeout(()=>{
                    if(window.google){
                        let autoComplete = new window.google.maps.places.Autocomplete(autoCompleteField.current,{"types": ['address']});
                        autoComplete.addListener('place_changed', ()=>{
                            handlePlaceChanged(autoComplete);
                        });
                    }
                },500)
            }catch (err){
                console.log(err.message)
            }
        };
        callApi();
    },[]);

    const {title,company,location,from,to,current,description} = formData;

    const onValueChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmitForm = (e)=>{
        e.preventDefault();
        if(current || compareDate(from,to,false)){
            submitHandler(formData,"experience");
            closeModal(EXPERIENCE_FORM);
        }else{
            setAlert("Please enter a valid date range","danger")
        }
    };

    return(
        <Rodal visible={shoulShowModal} onClose={()=>{
            closeModal(EXPERIENCE_FORM)
        }} width={800} customStyles={{height:"auto"}}>
            <div className="modal-wrapper">
                <div className="modal-dialogue">
                    <div className="modal-title-wrapper">
                        <h4 className="modal-title">Add Experience</h4>
                        <small className="text-danger">* Required Field</small>
                    </div>
                    <Alert/>
                    <form onSubmit={(e)=>{
                        onSubmitForm(e);
                    }}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="ex-title" name="title" value={title} onChange={e => onValueChange(e)}
                                   placeholder="* Job Title" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="ex-company" name="company" value={company} onChange={e => onValueChange(e)}
                                   placeholder="* Company" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="ex-location" name="location" value={location} onChange={e =>
                                onValueChange(e)} placeholder="Location" ref={autoCompleteField} />
                        </div>
                        <div className="form-group">
                            <input type="date" className="form-control" id="ex-from" name="from" autoComplete="off" placeholder="From"
                                   onChange={e => onValueChange(e)} required value={from}/>
                            <span className='input-clue'>* From Date</span>
                        </div>
                        <div className="form-group">
                            <input type="date" className="form-control" id="ex-to" name="to" autoComplete="off" placeholder="To"
                                   onChange={e => onValueChange(e)} value={to} disabled={formData.current?true:false}/>
                            <span className='input-clue'>To Date</span>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="currentJob" name="current" onChange={e => {
                                    setFormData({...formData,current:!current});
                                }} checked={current} value={current}/>
                                <label htmlFor="currentJob" className="custom-control-label">Current Job</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" id="ex-description" name="description"
                                      onChange={e => onValueChange(e)} placeholder="Description" value={description}>
                            </textarea>
                        </div>
                        <div className="form-group form-btn-wrapper">
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </Rodal>
    )
};

const mapStateToProps = (state)=>({
   shoulShowModal:state.globalStates.openModal.indexOf(EXPERIENCE_FORM)>-1?true:false
});

const mapDispatchToProps = {
    closeModal
};

export default connect(mapStateToProps,mapDispatchToProps)(ExperienceForm);

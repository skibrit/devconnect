import React,{useState,useEffect,useRef,Fragment} from "react";
import {connect} from "react-redux";
import {Link,withRouter} from "react-router-dom";
import {setAlert} from "../../../actions/alert";
import {manageProfile,getCurrentUserProfile,
    addExperience_Education,deleteExperience_Education} from "../../../actions/profile";
import {Animated} from "react-animated-css";
import {openModal} from "../../../actions/global";
import ExperienceForm from "../profile-forms/experienceForm";
import EducationForm from "../profile-forms/educationForm";
import scriptLoader from "../../../utils/loadExternalScript";
import {convertToLocalString} from "../../../utils/DateUtill";
import {EXPERIENCE_FORM,EDUCATION_FORM} from "../../../actions/constants"

const EditProfile = ({setAlert,getCurrentUserProfile,
                         createProfile,history,profile:{profile,isLoading},
                         openModal,addExperience_Education,deleteExperience_Education})=>{


    let autoCompleteField = useRef(null);

    const [formData, setFormData] = useState({
        company:"",
        website:"",
        location:"",
        status:0,
        skills:"",
        bio:"",
        githubUserName:"",
        youtube:"",
        twitter:"",
        facebook:"",
        linkedin:"",
        instragram:""
    });

    const [showSocialLinkTab,toggleSocialLinkTab] = useState(false);

    useEffect(()=>{
        const callApi = async ()=>{
            try{
                await scriptLoader("https://maps.googleapis.com/maps/api/js?key=AIzaSyDfJ2N7azyT5OST0Fy6nj2IRC0yAS_wWVc&libraries=places","google-place");
                setTimeout(()=>{
                    if(window.google){
                        let autoComplete = new window.google.maps.places.Autocomplete(autoCompleteField.current,{"types": ['address']});
                        autoComplete.addListener('place_changed', ()=>{
                            handlePlaceChanged(autoComplete,formData);
                        });
                    }
                },500)
            }catch (err){
                console.log(err.message)
            }
        };
        callApi();
    },[]);

    useEffect(()=>{
        getCurrentUserProfile();
        if(profile){
            setFormData({
                company:profile.company || "",
                website:profile.website || "",
                location:profile.location || "",
                status:profile.status,
                skills:profile.skills.join(","),
                bio:profile.bio || "",
                githubUserName:profile.githubUserName || "",
                youtube:profile.social?profile.social.youtube:"",
                twitter:profile.social?profile.social.twitter:"",
                facebook:profile.social?profile.social.facebook:"",
                linkedin:profile.social?profile.social.linkedin:"",
                instragram:profile.social?profile.social.instragram:""
            })
        }
    },[isLoading]);

    const handlePlaceChanged = (autoComplete,formData)=>{
        const place = autoComplete.getPlace();
        setFormData((prevState)=>{
            console.log(prevState);
            return {...prevState,location:place.formatted_address};
        })
    };
    const {company,website,location,status,skills,
        bio,githubUserName,youtube,twitter,facebook,linkedin,instragram} = formData;
    const onChange = e => {
        setFormData({...formData,[e.target.name]:e.target.value})
    };
    const onToggleSocialTab = e => {
        toggleSocialLinkTab(!showSocialLinkTab);
    };

    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        createProfile(formData,history);
    };

    const deleteItemFromList = (id,type)=>{
        deleteExperience_Education(id,type);
    };

    const createExperienceList = ()=>{
        const {experiences} = profile;
        return experiences.map((exp)=>{
            const {_id,title,company,from,to,current} = exp;
            return(
                <tr key={_id} index={_id}>
                    <td>{title}</td>
                    <td>{company}</td>
                    <td>{convertToLocalString(from)} - {current?"Present":convertToLocalString(to)}</td>
                    <td>
                        <button className="btn btn-danger" onClick={(e)=>{
                            e.preventDefault();
                            deleteItemFromList(_id,"experience")
                        }}>Delete</button>
                    </td>
                </tr>
            )
        })
    };

    const createEducationList = ()=>{
        const {education} = profile;
        return education.map((edu)=>{
            const {_id,degree,school,fieldOfStudy,from,to,current} = edu;
            return(
                <tr key={_id} index={_id}>
                    <td>{degree}</td>
                    <td>{school}</td>
                    <td>{convertToLocalString(from)} - {current?"Present":convertToLocalString(to)}</td>
                    <td>
                        <button className="btn btn-danger" onClick={(e)=>{
                            e.preventDefault();
                            deleteItemFromList(_id,"education")
                        }}>Delete</button>
                    </td>
                </tr>
            )
        })
    };

    return(
        <div className="section" >
            <div className='page-title-wrapper'>
                <h2 className='page-title'>Edit Profile</h2>
                <h6 className="text-danger">* Required Field</h6>
            </div>
            <form onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <select className="form-control" id="status" name="status"  value={status} onChange={e => onChange(e)} required>
                        <option value={0}>Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Manager">Manager</option>
                        <option value="Intern">Intern</option>
                        <option value="Student">Student</option>
                        <option value="Student">Other</option>
                    </select>
                    <span className='input-clue'>* Choose your current professional Status</span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="company" name="company" value={company} onChange={e => onChange(e)}
                           placeholder="Company"/>
                    <span className='input-clue'>Could be your company or you work for</span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="website" name="website" value={website} onChange={e =>
                        onChange(e)} placeholder="Website"/>
                    <span className='input-clue'>Could be your or a company website</span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="location" name="location" value={location} onChange={e => onChange(e)}
                           placeholder="Location" ref={autoCompleteField}/>
                    <span className='input-clue'>City & States suggested (ex: Boston, MA)</span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="skills" name="skills" value={skills} onChange={e =>
                        onChange(e)} required placeholder="* Skills"/>
                    <span className='input-clue'>Please use comma separated values (ex: HTML5,Javascript,PHP)</span>
                </div>
                <div className="form-group">
                    <textarea className="form-control" id="bio" name="bio" onChange={e => onChange(e)} placeholder="Bio" value={bio}></textarea>
                    <span className='input-clue'>Tell us a little about yourself</span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="githubUserName" name="githubUserName" value={githubUserName}
                           onChange={e => onChange(e)} placeholder="Github username"/>
                    <span className='input-clue'>If you want your latest repos and a github link, include your username</span>
                </div>


                <div className="form-group optional-btn-wrapper">
                    <button type="button" className="btn btn-light" onClick={()=>{
                        openModal(EXPERIENCE_FORM);
                    }}><i className="fas fa-plus"></i> Experience</button>
                </div>
                <div className="list-wrapper">
                    {profile && profile.experiences && profile.experiences.length>0 &&
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Company</th>
                                <th>Title</th>
                                <th>Years</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {createExperienceList()}
                            </tbody>
                        </table>
                    }
                </div>
                <div className="form-group optional-btn-wrapper">
                    <button type="button" className="btn btn-light" onClick={()=>{
                        openModal(EDUCATION_FORM);
                    }}><i className="fas fa-plus"></i> Education</button>
                </div>
                <div className="list-wrapper">
                    {
                        profile && profile.education && profile.education.length>0 &&
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>School</th>
                                <th>Degree</th>
                                <th>Years</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {createEducationList()}
                            </tbody>
                        </table>
                    }
                </div>

                <div className="form-group optional-btn-wrapper">
                    <button type="button" className="btn btn-light" onClick={()=>{
                        onToggleSocialTab();
                    }}><i className="fa fa-expand" aria-hidden="true"></i> Social Link</button>
                </div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={showSocialLinkTab} animateOnMount ={false}>
                    <div className={showSocialLinkTab?'fade-out' : 'fade-in' }>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-1 social-icon"><i className="fab fa-youtube youtube"></i></label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="youtube" name="youtube" value={youtube}
                                       onChange={e => onChange(e)} placeholder="Youtube Link"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-1 social-icon"><i className="fab fa-twitter twitter"></i></label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="twitter" name="twitter" value={twitter} onChange={e =>
                                    onChange(e)} placeholder="Twitter Link"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-1 social-icon"><i className="fab fa-facebook-f facebook"></i></label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="facebook" name="facebook" value={facebook} onChange={e =>
                                    onChange(e)} placeholder="Facebook Link"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-1 social-icon"><i className="fab fa-linkedin-in linkdin"></i></label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="linkedin" name="linkedin" value={linkedin}
                                       onChange={e => onChange(e)} placeholder="Linkedin Link"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-1 social-icon"><i className="fab fa-instagram instragram"></i></label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="instragram" name="instragram"
                                       value={instragram} onChange={e => onChange(e)} placeholder="Instragram Link"/>
                            </div>
                        </div>
                    </div>
                </Animated>
                <div className="form-group form-btn-wrapper">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link to="/dashboard" type="button" className="btn btn-primary"><i className="fas fa-arrow-left"></i> Go Back</Link>
                </div>
            </form>
            <ExperienceForm submitHandler={addExperience_Education} setAlert={setAlert}/>
            <EducationForm submitHandler={addExperience_Education} setAlert={setAlert}/>
        </div>
    )
};


const mapStateToProps = (state) => ({
    profile:state.profileStates
});

const mapDispatchAction = {
    setAlert,
    createProfile:manageProfile,
    openModal,
    getCurrentUserProfile,
    addExperience_Education,
    deleteExperience_Education
};

export default connect(mapStateToProps,mapDispatchAction) (withRouter(EditProfile));



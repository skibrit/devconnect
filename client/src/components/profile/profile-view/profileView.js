import React,{useState,useEffect,Fragment} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getCurrentUserProfile} from "../../../actions/profile";
import {convertToLocalString} from "../../../utils/DateUtill";
import "./profileView.scss";

const ProfileView = ({profile:{isLoading,profile},getCurrentUserProfile})=>{

    useEffect(()=>{
        getCurrentUserProfile();
        console.log(isLoading);
    },[isLoading]);

    return(
        <Fragment>
            {profile &&
                <div className='container profile-view'>
                    <div className="profile-view-wrapper">
                        <div className="profile-left-wrapper">
                            <div className="profile-photo-wrapper">
                                <div className="profile-photo-inner-wrapper">
                                    <img
                                        src={profile.user.avatar}
                                        alt="profile-photo"/>
                                    <div className="change-photo-btn">
                                        <h4 className="btn-text">Change Photo</h4>
                                    </div>
                                </div>
                            </div>
                            {
                                (profile.website || profile.githubUserName) &&
                                <div className="profile-left-column-row">
                                    <div className="profile-left-column-row-wrapper">
                                        <h3 className="profile-left-column-row-title">Portfolio</h3>
                                        <div className="profile-left-column-row-content">
                                            {
                                                profile.website &&
                                                <div className="content-row">
                                                    <h4>Website Link</h4>
                                                </div>
                                            }
                                            {
                                                profile.githubUserName &&
                                                <div className="content-row">
                                                    <h4>Github Link</h4>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="profile-left-column-row">
                                <div className="profile-left-column-row-wrapper">
                                    <h3 className="profile-left-column-row-title">Skills</h3>
                                    <div className="profile-left-column-row-content">
                                        {profile.skills.map((skill)=>{
                                            return(
                                                <div className="content-row">
                                                    <h4>{skill}</h4>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-center-wrapper">
                            <h2 className="user-title">{profile.user.name}</h2>
                            <h3 className="user-status">{profile.status}</h3>

                            <div className="profile-center-content-wrapper">
                                <div className="profile-center-row">
                                    <div className="profile-center-row-wrapper">
                                        <h4 className="profile-center-row-title">About</h4>
                                        <div className="profile-center-row-content">
                                            <div className="content-row row">
                                                <div className="col-md-3 content-title">
                                                    Name
                                                </div>
                                                <div className="col-md-9 content-value">
                                                    {profile.user.name}
                                                </div>
                                            </div>
                                            <div className="content-row row">
                                                <div className="col-md-3 content-title">
                                                    Email
                                                </div>
                                                <div className="col-md-9 content-value">
                                                    {profile.user.email}
                                                </div>
                                            </div>
                                            <div className="content-row row">
                                                <div className="col-md-3 content-title">
                                                    Phone
                                                </div>
                                                <div className="col-md-9 content-value">
                                                    01680136160
                                                </div>
                                            </div>
                                            <div className="content-row row">
                                                <div className="col-md-3 content-title">
                                                    Profession
                                                </div>
                                                <div className="col-md-9 content-value">
                                                    {profile.status}
                                                </div>
                                            </div>
                                            <div className="content-row row">
                                                <div className="col-md-3 content-title">
                                                    Company
                                                </div>
                                                <div className="col-md-9 content-value">
                                                    {profile.company || "N/A"}
                                                </div>
                                            </div>
                                            <div className="content-row row">
                                                <div className="col-md-3 content-title">
                                                    Location
                                                </div>
                                                <div className="col-md-9 content-value">
                                                    {profile.location || "N/A"}
                                                </div>
                                            </div>
                                            <div className="content-row row">
                                                <div className="col-md-3 content-title">
                                                    Bio
                                                </div>
                                                <div className="col-md-9 content-value">
                                                    {profile.bio || "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-center-row">
                                    <div className="profile-center-row-wrapper">
                                        <h4 className="profile-center-row-title">Experiences</h4>
                                        <div className="profile-center-row-content">
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th>Company</th>
                                                    <th>Title</th>
                                                    <th>Years</th>
                                                    <th>Location</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {profile.experiences.map((exp)=>{
                                                        const {_id,title,company,from,to,current,location} = exp;
                                                        return(
                                                            <tr key={_id} index={_id}>
                                                                <td>{title}</td>
                                                                <td>{company}</td>
                                                                <td>{convertToLocalString(from)} - {current?"Present":convertToLocalString(to)}</td>
                                                                <td>{location}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-center-row">
                                    <div className="profile-center-row-wrapper">
                                        <h4 className="profile-center-row-title">Education</h4>
                                        <div className="profile-center-row-content">
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th>School</th>
                                                    <th>Degree</th>
                                                    <th>Field of Study</th>
                                                    <th>Years</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {profile.education.map((edu)=>{
                                                        const {_id,degree,school,fieldOfStudy,from,to,current,location} = edu;
                                                        return(
                                                                <tr key={_id} index={_id}>
                                                                    <td>{degree}</td>
                                                                    <td>{school}</td>
                                                                    <td>{fieldOfStudy}</td>
                                                                    <td>{convertToLocalString(from)} -
                                                                        {current?"Present":convertToLocalString(to)}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-center-row">
                                    <div className="profile-center-row-wrapper">
                                        <h4 className="profile-center-row-title">Github Repos</h4>
                                        <div className="profile-center-row-content">

                                        </div>
                                    </div>
                                </div>
                                <div className="profile-center-row">
                                    <div className="profile-center-row-wrapper">
                                        <h4 className="profile-center-row-title">Recent Posts</h4>
                                        <div className="profile-center-row-content">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
};

const mapStateToProps = state =>({
   profile:state.profileStates,
});

const mapDispatchToProps = {
    getCurrentUserProfile
};

export default connect(mapStateToProps,mapDispatchToProps) (ProfileView);
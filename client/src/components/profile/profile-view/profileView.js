import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import "./profileView.scss";

const ProfileView = (profile)=>{

    if(!profile){
        return <Redirect to="/dashboard"/>
    }

    return(
        <div className='container profile-view'>
            <div className="profile-view-wrapper">
                <div className="profile-left-wrapper">
                    <div className="profile-photo-wrapper">
                        <div className="profile-photo-inner-wrapper">
                            <img src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" alt="profile-photo"/>
                            <div className="change-photo-btn">
                                <h4 className="btn-text">Change Photo</h4>
                            </div>
                        </div>
                    </div>
                    <div className="profile-left-column-row">
                        <div className="profile-left-column-row-wrapper">
                            <h3 className="profile-left-column-row-title">Portfolio</h3>
                            <div className="profile-left-column-row-content">
                                <div className="content-row">
                                    <h4>Website Link</h4>
                                </div>
                                <div className="content-row">
                                    <h4>Github Link</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-left-column-row">
                        <div className="profile-left-column-row-wrapper">
                            <h3 className="profile-left-column-row-title">Skills</h3>
                            <div className="profile-left-column-row-content">
                                <div className="content-row">
                                    <h4>Javascript</h4>
                                </div>
                                <div className="content-row">
                                    <h4>Java</h4>
                                </div>
                                <div className="content-row">
                                    <h4>C#</h4>
                                </div>
                                <div className="content-row">
                                    <h4>Html5</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-center-wrapper">
                    <h2 className="user-title">KShiti Gilani</h2>
                    <h3 className="user-status">Web Developer & Designer</h3>

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
                                            Kshiti Gilani
                                        </div>
                                    </div>
                                    <div className="content-row row">
                                        <div className="col-md-3 content-title">
                                            Email
                                        </div>
                                        <div className="col-md-9 content-value">
                                            nsaidulamin@gmail.com
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
                                            developer
                                        </div>
                                    </div>
                                    <div className="content-row row">
                                        <div className="col-md-3 content-title">
                                            Company
                                        </div>
                                        <div className="col-md-9 content-value">
                                            NBsoft
                                        </div>
                                    </div>
                                    <div className="content-row row">
                                        <div className="col-md-3 content-title">
                                            Location
                                        </div>
                                        <div className="col-md-9 content-value">
                                            Dhaka,Bangladesh
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
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John</td>
                                                <td>Doe</td>
                                                <td>john@example.com</td>
                                                <td><button className="btn btn-danger">Delete</button></td>
                                            </tr>
                                            <tr>
                                                <td>Mary</td>
                                                <td>Moe</td>
                                                <td>mary@example.com</td>
                                                <td><button className="btn btn-danger">Delete</button></td>
                                            </tr>
                                            <tr>
                                                <td>July</td>
                                                <td>Dooley</td>
                                                <td>july@example.com</td>
                                                <td><button className="btn btn-danger">Delete</button></td>
                                            </tr>
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
                                            <th>Years</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>John</td>
                                            <td>Doe</td>
                                            <td>john@example.com</td>
                                            <td><button className="btn btn-danger">Delete</button></td>
                                        </tr>
                                        <tr>
                                            <td>Mary</td>
                                            <td>Moe</td>
                                            <td>mary@example.com</td>
                                            <td><button className="btn btn-danger">Delete</button></td>
                                        </tr>
                                        <tr>
                                            <td>July</td>
                                            <td>Dooley</td>
                                            <td>july@example.com</td>
                                            <td><button className="btn btn-danger">Delete</button></td>
                                        </tr>
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
    )
};

const mapStateToProps = state =>({
   profile:state.profileStates.profile
});

export default connect(mapStateToProps,null) (ProfileView);
import React from "react";
import {connect} from "react-redux";
import "./alert.scss";

const Alert = ({alertStates})=>{
    if(alertStates && alertStates.length>0){
        return alertStates.map((alert)=>{
            return(
                <div key={alert.id} index={alert.id} className={`alert alert-dismissible alert-${alert.alertType}`}>
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <span>{alert.msg}</span>
                </div>
            )
        })
    }else{
        return(<div></div>)
    }
};

const mapStateToProps = (state)=>({
    alertStates:state.alertStates
});

export default connect(mapStateToProps,null)(Alert)
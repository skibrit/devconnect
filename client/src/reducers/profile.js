import {} from "../actions/constants";

const defaultStates = {

};

export default (state=defaultStates,action)=>{
   const {type,payload} = action;

   switch (type){

       default:
           return state;
   }
}
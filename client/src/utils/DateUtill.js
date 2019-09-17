//compare d1 against d2
const compareDate = (d1,d2,direction=true)=>{
    var d1 = new Date(d1);
    var d2 = new Date(d2);
    if(!direction){
        return  d1.getTime() < d2.getTime()
    }
    return  d1.getTime() > d2.getTime()
};

const convertToLocalString = (d)=>{
    return new Date(d).toLocaleDateString();
}

export {
    compareDate,
    convertToLocalString
}
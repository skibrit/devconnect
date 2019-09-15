export default function loadScript(url,id){
    return new Promise((resolve,reject)=>{
        try{
            if(document.querySelector(`#${id}`)==null){
                const script = document.createElement("script");
                script.src = url;
                script.async = true;
                script.defer = true;
                script.setAttribute("id",id);
                document.body.appendChild(script);
                // document.head.appendChild(script);
            }
            resolve(true);
        }catch (err){
            reject(err.message);
        }
    })
}
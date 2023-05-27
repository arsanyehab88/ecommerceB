




export const Validition = (schema)=>{
    return (req,res,next)=>{
        console.log(req.body);
        let inputs = {...req.body,...req.query,...req.params}
        let {error}= schema.validate(inputs,{abortEarly:true});
        
        if(error){
            let errors = error.details.map((detail)=>detail.message)
            res.json(errors)
        }else{
            next()
        }
    }
}
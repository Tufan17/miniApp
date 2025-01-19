

const authorized = (req,res,next)=>{
    if(req.role.name === "admin"){
      next();
    }else{
      res.status(403).send({error:"You are not authorized"});
    }
  }

  module.exports = authorized
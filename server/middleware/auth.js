const admin = require('../firebase');

exports.authCheck = async (req,res,next)  =>{
    //token
    // console.log(req.headers);
    // next();
    try {
        //validate token and get user
       const firebaseUser = await admin
           .auth()
           .verifyIdToken(req.headers.authtoken);
       console.log("firebase user in auth check", firebaseUser);
       // make available in the request so we can access this info in the controllers
       req.user = firebaseUser;
       next();
    }catch (err){
        res.status(401).json({
            err: "invalid or expired token"
        })
    }
}

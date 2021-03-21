const express = require("express");
const router = express.Router();

//route
router.get('/create-update-user', (req, res)=>{
    res.json({
        data: "hey you hit the create or update user api endpoint "
    })
});



module.exports=router;
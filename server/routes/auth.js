const express = require("express");
const router = express.Router();
// middlewares
const {authCheck} = require ("../middleware/auth")
//import
//make sure to destructure
const {createUpdateUser,currentUser}  = require("../controllers/auth")

//route
router.post('/create-update-user',authCheck, createUpdateUser);
router.post("/current-user",authCheck, currentUser);
module.exports=router;
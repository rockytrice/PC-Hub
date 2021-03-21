const express = require("express");
const router = express.Router();
// middlewares
const {authCheck} = require ("../middleware/auth")
//import
//make sure to destructure
const {createUpdateUser} = require("../controllers/auth")

//route
router.post('/create-update-user',authCheck, createUpdateUser);

module.exports=router;
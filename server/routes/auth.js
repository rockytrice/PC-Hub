const express = require("express");
const router = express.Router();
//import
//make sure to destructure
const {createUpdateUser} = require("../controllers/auth")
//route
router.get('/create-update-user', createUpdateUser);


module.exports=router;
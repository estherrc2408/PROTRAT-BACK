const express = require('express');
const {validateLog} = require ('../controllers/logController');
const router = express.Router();

router.post('/',validateLog);

module.exports=router;
const express = require('express');
const db = require('./db');
const router = express.Router();





/*----------------------------Routes----------------------------------- */

router.get('/getInfo',(req,res) => {
    
        // Import from db.js
        db.userInfo()
        .then(data => { 

            res.status(200);
            res.json(data);
        })
        .catch(err => {

            res.status(500);
            res.json({err,message: err.message});
        });

});




router.get('/addNewKey', (req, res) => {
    
        // Import from db.js
        db.addNewKey()
        .then(data => {

            res.status(200);
            res.json(data);
        })
        .catch(err => {

            res.status(500);
            res.json({ err, message: err.message });
        });
});






/*-----------------------------Exports------------------------------------ */
module.exports = router;

//short url

const express = require('express');
const router = express.Router();

const Url = require('../models/Url'); 

//@route        GET /:code
//@description  redirect to long/original url
// we will create a new end point so that when that short url is added the user gets redirect to the same page that gets loaded when long url runs

router.get('/:code', async(req,res)=>{
    try {
        const url = await Url.findOne({ urlCode:req.params.code });  //search that code in database

        if(url){
            return res.redirect(url.longUrl); //if found then redirect to that same page which the longUrl would load
        }else{
            return res.status(404).json('no url found'); //else say no such url is found, therefore generate one first
        }

    } catch (err) {
        console.error(err);  // server side error
        res.status(500).json('server error');
        
    }
})

module.exports = router;
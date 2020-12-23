//for post routes   //where we create short url 

const express = require('express');
const router = express.Router();
const validUrl = require('valid-url'); //check for the correctness of a url entered
const shortid = require('shortid');//shortid creates amazingly short non-sequential url-friendly unique ids. 
const config = require('config');//to have access to base url

const Url = require('../models/Url');

//@route        POST api/url/shorten
//@description  Create short URL for long URL sent in request body

router.post('/shorten',async (req,res)=>{
    const {longUrl} = req.body; // we get the longurl sent by the client 
    const baseUrl = config.get('baseUrl');

    //check base url
    if(!validUrl.isUri(baseUrl)){  
        return res.status(401).json('invalid base url');
    }

    //create url code
    const urlCode = shortid.generate();

    //check long url
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl:longUrl}); //to check if the long url already exists

            if(url){  //if exists then send that
                res.json(url);
            } else{
                const shortUrl = baseUrl + '/' + urlCode;  //else create one short url if it doesnot exsits in the database

                url = new Url({  //creating new schema which has all these properties.. note that properties and value have same name so no need to write longUrl: longUrl
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save() //save this new short url generated to dataabase 
                res.json(url);  //return to the client 
            }

            
        } catch (err) {

            console.error(err);  // server side error 
            res.status(500).json('server error');
        }
    }else{   //if the long url is invalid
        res.status(401).json('invalid long url');
    }

})

module.exports = router;
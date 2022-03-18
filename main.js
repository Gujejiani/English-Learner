const express = require('express');
const fileUpload = require('express-fileupload')

const pdfParse = require('pdf-parse')


const app =express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(fileUpload())

app.post('/extract-text', (req, res)=>{
    console.log('request received')
    console.log(req.files)
    if(!req.files && !req.files.pdfFile){
        res.status(400);
        res.end();
        console.log('session ended')
    }

    pdfParse(req.files.pdfFile).then(result=>{
        console.log(result.text)
        res.send(result.text).status(200)
    })
})

app.use( (req, res)=>{
    console.log('hello')
    res.json('hello').status(200)
})
const port =1111
app.listen(port,()=>{
    console.log('app is listening on port ', port)
   
})


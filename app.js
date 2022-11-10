/*jslint node: true */
"use strict";
import soap from 'soap';
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import { request, gql } from 'graphql-request'


import { example } from './example.js';
import consume from './request.js'

const url = "http://localhost:5000/graphql";

function getActById(id) {
    const query = gql `{
            getAct(actId:${id}){
                message
            }
        }`
    return query
}

// the function, used by the service
function main(args, callback) {
    const id = args.id;
    request(url, getActById(id))
        .then((data) => {
            const act = data.getAct.message;
            callback({
                result: act
            });
        })
        .catch(error => {
            console.log(error)
            callback({
                result:example
            })
        })
}

// the service
var serviceObject = {
    MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: main
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: main
        }
    }
};

const xml = fs.readFileSync('service.wsdl', 'utf8');
const app = express();

app.use(cors());

// root handler
app.get('/', function(req, res) {
    res.send('Node Soap Example!<br /><a href="/wsdl?wsdl">Wsdl endpoint</a>');
})

//routes for consuming the other system
app.get('/consume/:id', consume);

// Launch the server and listen
const port = 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
    const wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check port " + port + " to see if the service is working");
});
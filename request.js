import soap from 'soap';

const url = "https://2ftestinterface.team-uncademy.repl.co/wsdl?wsdl"

export default async(req, res) => {
    const id = req.params.id;
    soap.createClient(url, function (err, client) {
        if (err) {
            throw err;
        }
        /* 
         * Parameters of the service call: they need to be called as specified
         * in the WSDL file
         */
        var args = {
            id: id
        };
        // call the service
        client.MessageSplitter(args, function(err, response) {
            if (err)
                throw err;
            // print the service returned result
            //res.send(client.describe());
            //res.json(typeOf(client.Message.courseName));
            console.log(response.example);
            return res.json(response.example);
        });
    });
};
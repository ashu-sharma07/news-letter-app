const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();
const portNumber = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;    
    mailchimp.setConfig({
    apiKey: "aeba063739e20814263b2272ee81b119-us13",
    server: "us13",
    });

    const listId = "c36930a4c4";
    const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: emailAddress
    };

    async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
        }
    });
}


run()

res.sendFile(__dirname+"/success.html");

});

app.listen(process.env.PORT || portNumber , function () {
  console.log("App is running on port " + portNumber);
});


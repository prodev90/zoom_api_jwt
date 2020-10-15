const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');

const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
var email, userid, resp;
const port = 3000;


const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000),
};
const token = jwt.sign(payload, config.APISecret,);

app.get('/', (req, res) => res.send(req.body));

app.post('/userinfo', (req, res) => {
    email = req.body.email;
    console.log(email, token);
    var options = {
        uri: "https://api.zoom.us/v2/users/" + email,
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true,
        settings: {
            'topic': 'テスト',
            'type': 1,
            'time_zone': 'Asia/Tokyo',
            'agenda': 'ズームAPIを試す',
            'settings': {
                'host_video': true,
                'participant_video': true,
                'approval_type': 0,
                'audio': 'both',
                'enforce_login': false,
                'waiting_room': false,
                'registrants_email_notification': false
            }

        }
    };

    rp(options).then(function (response) {
        console.log('User has', response);
        resp = response
        var title = '<center><h3>User\'s information:</h3></center>'
        var result = title + '<code><pre style="background-color:#aef8f9;">' + JSON.stringify(resp, null, 2) + '</pre></code>'
        console.log('User has', '<br>' + result);
        res.send({url: response.personal_meeting_url});

    })
    .catch(function (err) {
        console.log('API call failed, reason ', err);
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
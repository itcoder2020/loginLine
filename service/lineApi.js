

//_______Credit By ITCoder 2021___________//
const request = require("request")
var randomString = require("randomstring");
var httpBuildQuery = require('http-build-query');
var LINE_LOGIN_CHANNEL_ID="1644976375"
var LINE_LOGIN_CHANNEL_SECRET="af3e2cab0c10610782a1ba7b8b3877bc"
var LINE_LOGIN_CALLBACK_URL="https://76aa4885cb09.ngrok.io/callback"
module.exports.authorize = function () {
    let baseUrl = "https://access.line.me/oauth2/v2.1/authorize?"
    var q = {
        response_type: 'code',
        client_id: LINE_LOGIN_CHANNEL_ID,
        redirect_uri: LINE_LOGIN_CALLBACK_URL,
        scope: 'openid profile',
        state: randomString.generate()
    }
    let api = baseUrl + httpBuildQuery(q)
    return api;
}
module.exports.getProfile = ((accessToken) =>{
    return new Promise((resolutionFunc, rejectionFunc) => {
        try {
            if(accessToken   == '') rejectionFunc('access_token is null')
            let baseUrl = "https://api.line.me/v2/profile";
            let option = {
                url: baseUrl,
                method: "get",
                headers:
                {
                    'Authorization': 'Bearer '+accessToken,
                    
                }
                
            }
            request(option, (error, res, body) => {
                if (error) throw new Error(error)
                let obj = JSON.parse(body)
                if (typeof obj.error != "undefined") resolutionFunc(false)
                resolutionFunc(obj)
            })
        } catch (error) {
            console.log(error)
            rejectionFunc(error.message)
        }


    });
})
module.exports.requestAccessToken = function (code) {
    return new Promise((resolutionFunc, rejectionFunc) => {
        try {
            let baseUrl = "https://api.line.me/oauth2/v2.1/token";
            let data = {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': LINE_LOGIN_CALLBACK_URL,
                'client_id': LINE_LOGIN_CHANNEL_ID,
                'client_secret': LINE_LOGIN_CHANNEL_SECRET
            }
            let option = {
                url: baseUrl,
                method: "post",
                headers:
                {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                form: data
            }
            request(option, (error, res, body) => {
                if (error) throw new Error(error)
                let obj = JSON.parse(body)
                //console.log(obj)
                if (typeof obj.error != "undefined") resolutionFunc(false)
                resolutionFunc(obj)
            })
        } catch (error) {
            console.log(error)
            rejectionFunc(error.message)
        }


    });
}



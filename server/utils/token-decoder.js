const jwt_decode = require('jwt-decode');

function decodeTokenFromRequest(request){
    let header = request.headers.authorization;
    let decodedToken = jwt_decode(header);
    return decodedToken;
}

module.exports = {
    decodeTokenFromRequest
}
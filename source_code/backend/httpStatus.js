const httpStatus = {
    // 2xx successful response 
    OK : 200,
    Created : 201,
    Accepted : 202,
    
    // 4xx client error response 
    BadRequest : 400 ,
    Anauthorized : 401,
    Forbidden : 403,
    NotFound : 404,
    MethodNotAllowed : 405 ,
    RequestTimeout : 408,
    UnSupportedMediaType: 415,
    TooManyRequests: 429,

    // 5xx server error responses 
    InternalServerError: 500,
    NotImplemented : 501,
    BadGateWay : 502,

}


exports.httpStatus = httpStatus ;
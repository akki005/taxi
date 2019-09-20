var http_status = require('http-status-codes');

module.exports.RESPONSE_MESSAGES = {
    SUCCESS: "Success",
    CONFLICTS:"Data Already Exist",
    INTERNAL_SERVER_ERROR:http_status.getStatusText(http_status.INTERNAL_SERVER_ERROR),
    NOT_FOUND:"Not Matching Data Found"
}
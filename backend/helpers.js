const { password } = require("keygenerator/lib/keygen");

function isAlphaNumeric(str) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
        }
    }
    return true;
};


const validate_string = (username,len) => {
    if (
        username.length < len ||
        !isAlphaNumeric(username)
    ) return false;
    return true;
}

const validate_password = username => validate_string(username,4);
const validate_username = password => validate_string(password,6);

const is_same_day = (date1,date2) => !(
    date1.getDate() !== date2.getDate() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getYear() !== date2.getYear()
);

const exponential_growth = (base,growth,power) => { 
    return base * Math.pow(( 1 + growth),power);
}

module.exports = {
    isAlphaNumeric,
    validate_password,
    validate_username,
    is_same_day,
    exponential_growth
}
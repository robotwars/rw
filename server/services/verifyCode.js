var chai = require('chai');
var expect  = chai.expect;

module.exports = function(code) {

    // try and chai plugin
    console.log("within verifyCode")
    console.log(code);

    // Get result from a sandboxed environment
    var result = {}

    // Check bearing
    console.log(result['bearTo']);
    try{
        expect([undefined,0,90,180,270]).to.include(result['bearTo']);
    } catch(e){
        console.log("Bad user!")
        console.log(e)
    }



    //console.log(code['bearTo']);
    // return something good, bad
}

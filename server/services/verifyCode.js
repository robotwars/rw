var chai = require('chai');
var expect  = chai.expect;

module.exports = function(code) {

    // try and chai plugin
    console.log("within verifyCode")
    console.log(code);

    // Get result from a sandboxed environment
    var result = {bearTo: 270}

    // Check bearing
    console.log(result['bearTo']);
    try{
        expect(result['bearTo']).to.equal(271);
    } catch(e){
        console.log("Bad user!")
        console.log(e)
    }



    //console.log(code['bearTo']);
    // return something good, bad
}

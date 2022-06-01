const text = "     FunctionUP   ";
const result1 = text.trim();
const lower = function changeToLowerCase(){
    console.log("this is lowercase - "+text.toLowerCase())
}
const upper = function changeToUpperCase(){
    console.log("this is uppercase - "+text.toUpperCase())
}
module.exports.trim = result1
module.exports.lower = lower
module.exports.upper = upper
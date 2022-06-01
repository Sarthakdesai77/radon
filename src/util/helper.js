const today = new Date()

const dd = function printDate(){
    return today.getDate();
}

const mm = function printMonth(){
    return today.getMonth();
}
const batchInfo = function getBatchInfo(){
    console.log("Roadon, W3D3, the topic for today is Nodejs module system");
}
module.exports.dd = dd
module.exports.mm = mm
module.exports.batchInfo = batchInfo
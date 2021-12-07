const rsaImport = require('node-rsa');
const bcryptImport = require('bcrypt');
const makeKey = new rsaImport({b:302});

function encryptSensitive(PassName){


}

function rsaHide(plainTitle){
    var hiddenMessage = key.encrypt(plainTitle,'base64');
    return hiddenMessage;
} 

function rsaReveal(cipherTitle){
    var revealedMessage = key.decrypt(cipherTitle,'utf8');
    return revealedMessage;
}
export default {rsaHide,rsaReveal};

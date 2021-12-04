numbers = {'80':'16','87':'23','75':'11','84':'20','66':'2','90':'26','82':'18','65':'1','79':'15','70':'6','88':'24','67':'3','89':'25','72':'8','86':'22','68':'4','83':'19','71':'7','74':'10','69':'5','76':'12','73':'9','77':'13','81':'16','78':'14','85':'21'};
otherNumbers = {'16':'80','23':'87','11':'75','20':'84','2':'66','26':'90','18':'82','1':'65','15':'79','6':'70','24':'88','3':'67','25':'89','8':'72','22':'86','4':'68','19':'83','7':'71','10':'74','5':'69','12':'76','9':'73','13':'77','16':'81','14':'78','21':'85'};
letters = ['K','F','U','Z','J','O','S','A','M','Y','X','D','L','E','W','C','G','V','H','N','R','T','Q','P','I','B'];
newValue = "";
//function encryptData(dataValue){
    
//}

//function hideTime(dataValue){
    holding = String.split(dataValue,"/");

//}

function hideMessage(dataValue){
    counter = 0;
    while(counter<dataValue.length){
        dataValue = dataValue.toUpperCase();
        index = dataValue.charCodeAt(counter);
        getLetter = numbers[index];
        newLetter = letters[getLetter-1];
        if(newValue == ""){
            newValue = newLetter;
        }else{
            newValue = newValue + newLetter;
        }
        counter+=1;
    }
    return newValue;
}

function revealMessage(dataValue){
    counter = 0;
    while(counter<dataValue.length){
        index = letters.indexOf(dataValue[counter]);
        oldLetter = otherNumbers[index+1];
        fullLetter = String.fromCharCode(oldLetter);
        if(newValue == ""){
            newValue = fullLetter;
        }else{
            newValue = newValue + fullLetter;
        }
        counter+=1;
    }
    return newValue;
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import Log from '../objects/Log';
import ConfigStore, { getConfig } from '../objects/ConfigStore';

// var info = await AsyncStorage.getItem("timeDisplay");

function nonMilitaryTime(timeInValue){
    let amerTime;
    let deadHours = parseInt(timeInValue.getHours());
    let deadMin = parseInt(timeInValue.getMinutes());
    if(deadHours>12){
      amerTime = deadHours-12;
    }else{
      amerTime = timeInValue.getHours();
    }
    
    if(deadMin%10 == 0){
        amerTime = amerTime.toString() + ":"+timeInValue.getMinutes()+"0";
    }else if(deadMin<10){
        amerTime = amerTime.toString() + ":0"+timeInValue.getMinutes();
    }else{
        amerTime = amerTime.toString() + ":"+timeInValue.getMinutes();
    }
    
    return amerTime
  }

  const returnDate = (timeValueIn) => {
      if("Am"=="Am"){
        let month = parseInt(timeValueIn.getMonth())+1;
        month = month.toString();
        let day = timeValueIn.getDate();
        let year = timeValueIn.getFullYear();
        let timeValue = nonMilitaryTime(timeValueIn);
        let fullDateValue = month + "/"+day+"/"+year+"  "+timeValue;
        return fullDateValue;
      }else{
        return "hel";
      }
    
  }

  export default returnDate;
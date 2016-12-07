var Utils = {
    displayTel: function(tel) {
        if(tel != null){
            tel = tel.replace(/ /g,"").replace(/\./g,"");
            if(tel.length == 10) {
                return tel.substring(0,2) + " " + tel.substring(2,4) + " " + tel.substring(4,6) + " " + tel.substring(6,8) + " " + tel.substring(8,10);
            }else{
                return tel;
            }
        } else{
            return "";
        }
    }
};
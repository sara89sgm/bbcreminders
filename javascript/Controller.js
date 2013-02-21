var Controller_init = function () {
     

        this.getDataRadio();
    };

    function getDataRadio () {

        $.ajax({
            url : "http://www.bbc.co.uk/radio1/programmes/schedules/england.json",

            success : function (data) {
               // console.log("schedule",data);
                BbcData._showSchedule(data);    
            }
        });

    }

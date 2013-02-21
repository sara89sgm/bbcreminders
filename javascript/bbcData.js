      function logResponse(response) {
        if (console && console.log) {
          console.log('The response was', response);
        }
      }

      $(function(){
        
        // Set up so we handle click on the buttons
        $('#postToWall').click(function() {
          FB.ui(
            {
              method : 'feed',
              link   : $(this).attr('data-url')
            },
            function (response) {
              // If response is null the user canceled the dialog
              if (response != null) {
                logResponse(response);
              }
            }
          );
        });

        $('#sendToFriends').click(function() {
          FB.ui(
            {
              method : 'send',
              link   : $(this).attr('data-url')
            },
            function (response) {
              // If response is null the user canceled the dialog
              if (response != null) {
                logResponse(response);
              }
            }
          );
        });

        $('#sendRequest').click(function() {
          FB.ui(
            {
              method  : 'apprequests',
              message : $(this).attr('data-message')
            },
            function (response) {
              // If response is null the user canceled the dialog
              if (response != null) {
                logResponse(response);
              }
            }
          );


       

       

        /*

        //Radio 2

        $.ajax({
            url : "http://www.bbc.co.uk/radio2/programmes/schedules.json",

            success : function (data) {
                console.log("schedule",data);
                _showSchedule(data);    
            }
        });

        //Radio 3
        $.ajax({
            url : "http://www.bbc.co.uk/radio3/programmes/schedules.json",

            success : function (data) {
                console.log("schedule",data);
                _showSchedule(data);    
            }
        });


        //Radio 4

        $.ajax({
            url : "http://www.bbc.co.uk/radio4/programmes/schedules/fm.json",

            success : function (data) {
                console.log("schedule",data);
                _showSchedule(data);    
            }
        });*/

      


        });
      });


function _showSchedule(schedule){
      var programmes=schedule.schedule.day.broadcasts;
      $("#r1Schedule").empty();
      //id=programmes [i]
      console.log("here");
      var i = 0;
      var programmeActual = programmes[0];

      var method="_storeReminder('"+programmeActual.programme.pid+"') ";

      while(((typeof(programmeActual)) != 'undefined')){
         $("#r1Schedule").append('<li id="remider-'+programmeActual.programme.pid+'"><p onclick ="_storeReminder('+programmeActual.programme.pid+')">Title:'+programmeActual.programme.display_titles.title+'</p>'+
          '<p class="service">'+schedule.schedule.service.key+'</p>'+
          '<p class="description">'+programmeActual.programme.short_synopsis+'</p>'+
          '<p class="start">'+programmeActual.start+'</p>'+
          '<a onclick="'+method+'">Remind me!</a></li></br>');
        i++;
        programmeActual = programmes[i];
      }
      

    }

    function _storeReminder(id){
        var Reminder = Parse.Object.extend("Reminder");
        var reminder = new Reminder();
         console.log("id", id);
         //var title= "#"+id+" .title";
         var title = $('#reminder-' + id + ' .title').val();
         var start = $("#reminder-"+ id + " .start").val();
         var description = $("#reminder-"+id+" .description").val();
         var service = $("#reminder-"+id+" .service").val();
         var target="http://www.bbc.co.uk/programmes/"+id;
         console.log("title"+title);
        reminder.set("pid", id);
        reminder.set("title", title);
        reminder.set("service", service) ;
        reminder.set("description", description);
        reminder.set("action", "Available to Listen Live");
        reminder.set("target", target);
        reminder.set("start", start);
         
        reminder.save(null, {
          success: function(gameScore) {
            alert("sucess");
          },
          error: function(gameScore, error) {
       alert("error");
          }
      });
    }



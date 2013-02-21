
 var BbcData_showSchedule = function(schedule){
      var programmes=schedule.schedule.day.broadcasts;
      $("#r1Schedule").empty();
      //id=programmes [i]
      console.log("here");
      var i = 0;
      var programmeActual = programmes[0];

      var method="BbcData_storeReminder('"+programmeActual.programme.pid+"') ";

      console.log(programmeActual);
      while(((typeof(programmeActual)) != 'undefined')){
         $("#r1Schedule").append('<li class="reminder" id="'+programmeActual.programme.pid+'"><p onclick ="_storeReminder('+programmeActual.programme.pid+')">Title:'+programmeActual.programme.display_titles.title+'</p>'+
          '<p class="service">'+schedule.schedule.service.key+'</p>'+
          '<p class="description">'+programmeActual.programme.short_synopsis+'</p>'+
          '<p class="start">'+programmeActual.start+'</p>'+
          '<a class="remind-me-button" onclick="'+method+'">Remind me!</a></li></br>');
        i++;
        programmeActual = programmes[i];
      }
      

    };

    var BbcData_storeReminder = function(id){
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
    };



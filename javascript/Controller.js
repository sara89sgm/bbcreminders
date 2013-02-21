define([
    'javascript/jquery-1.7.1.min.js',
    'javascript/parse-1.2.0.js',
    'javascript/bbcData.js',
], function ($ , Parse , BbcData) {

     var exports = {};

       (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    
    exports.init = function () {
      console.log("init");
      console.log(Parse);
      FB._https = true;
        FB.init({
          appId      : '<?php echo AppInfo::appID(); ?>', // App ID
          channelUrl : '//<?php echo $_SERVER["HTTP_HOST"]; ?>/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true // parse XFBML
        });

        // Listen to the auth.login which will be called when the user logs in
        // using the Login button
        FB.Event.subscribe('auth.login', function(response) {
          // We want to reload the page now so PHP can read the cookie that the
          // Javascript SDK sat. But we don't want to use
          // window.location.reload() because if this is in a canvas there was a
          // post made to this page and a reload will trigger a message to the
          // user asking if they want to send data again.
          window.location = window.location;
        });

        FB.Canvas.setAutoGrow();

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


    return exports;
});
(function() {
  var auth_callback, get_current_user_info, post_to_users_feed, upload_a_photo;

  window.fbAsyncInit = function() {
    FB.init({
      appId: '101677663306665',
      channelUrl: '//fb_coffee_demo.com/channel.html',
      status: true,
      cookie: true,
      xfbml: true
    });
    return ($(document)).ready(function() {
      return FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          set_status("This user is logged in to facebook and has authorized your application");
          return get_current_user_info();
        } else if (response.status === 'not_authorized') {
          set_status("This user is logged in to facebook but has not authorized your application");
          set_status("Requesting Facebook access...");
          return FB.login(auth_callback, {
            scope: 'publish_stream'
          });
        } else {
          set_status("This user is not logged into facebook");
          set_status("Requesting Facebook login...");
          return FB.login(auth_callback, {
            scope: 'publish_stream'
          });
        }
      });
    });
  };

  window.set_status = function(text) {
    var $status_div;
    $status_div = $('#status');
    return $status_div.html("" + ($status_div.html()) + "<br/>" + text);
  };

  auth_callback = function(response) {
    if (response.authResponse) {
      set_status('The user has authenticated the application');
      return get_current_user_info();
    } else {
      return set_status('User cancelled login or did not fully authorize.');
    }
  };

  get_current_user_info = function(callback) {
    ($('#post_to_feed, #post_to_timeline')).show();
    set_status('Fetching user data...');
    return FB.api('/me', function(response) {
      set_status("Good to see you, " + response.name + "!");
      if (callback != null) return callback(response);
    });
  };

  upload_a_photo = function(callback) {
    var data, raw_image_data;
    set_status('Posting user photo...');
    raw_image_data = "BINARY";
    data = {
      source: raw_image_data,
      message: "Photo Description"
    };
    return FB.api('/me/photos', 'post', data, function(response) {
      if (!response || response.error) {
        set_status('Error occured');
      } else {
        set_status("Photo ID: " + response.id);
      }
      if (callback != null) return callback(response);
    });
  };

  post_to_users_feed = function(callback) {
    var body, data;
    body = 'Reading JS SDK documentation';
    set_status('Posting to feed...');
    data = {
      picture: "https://s3.amazonaws.com/banters.com-produciton/posts/13483/original?1333982098",
      message: body,
      caption: "Caption for your post",
      name: "Title of your post",
      description: "Description of your post"
    };
    return FB.api('/me/feed', 'post', data, function(response) {
      if (!response || response.error) {
        console.log(response);
        set_status('Error occured');
      } else {
        set_status("Post ID: " + response.id);
      }
      if (callback != null) return callback(response);
    });
  };

  ($(document)).ready(function() {
    return ($('#post_to_feed')).click((function() {
      return post_to_users_feed(null);
    }));
  });

}).call(this);

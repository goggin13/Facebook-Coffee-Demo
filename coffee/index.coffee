
# Callback that facebook fires after the FB object 
# has been initialized
window.fbAsyncInit = ->
  FB.init
    appId      : '101677663306665'
    channelUrl : '//fb_coffee_demo.com/channel.html'
    status     : true
    cookie     : true
    xfbml      : true

  ($ document).ready ->
    FB.getLoginStatus (response) ->
      if (response.status == 'connected')
        set_status "This user is logged in to facebook and has authorized your application"
        get_current_user_info()
      else if (response.status == 'not_authorized')
        set_status "This user is logged in to facebook but has not authorized your application"
        set_status "Requesting Facebook access..."
        FB.login auth_callback, {scope: 'publish_stream'}
      else
        set_status "This user is not logged into facebook"
        set_status "Requesting Facebook login..."
        FB.login auth_callback, {scope: 'publish_stream'}
 
 
# Update the list of messages on the page
window.set_status = (text) -> 
  $status_div = ($ '#status')
  $status_div.html "#{$status_div.html()}<br/>#{text}"  


# Handle callback from facebook auth API
auth_callback = (response) ->
  if (response.authResponse) 
    set_status 'The user has authenticated the application'
    get_current_user_info()
  else 
    set_status 'User cancelled login or did not fully authorize.'


# Get the current user's data and display their name
get_current_user_info = (callback) ->
  ($ '#post_to_feed, #post_to_timeline').show()
  set_status 'Fetching user data...'
  FB.api '/me', (response) ->
    set_status "Good to see you, #{response.name}!"  
    callback(response) if callback?


# Upload a photo to the users photo stream
upload_a_photo = (callback) ->
  set_status 'Posting user photo...'
  raw_image_data = "BINARY"
  data = 
    source: raw_image_data
    message: "Photo Description"
    
  FB.api '/me/photos', 'post', data, (response) ->
    if (!response || response.error)
      set_status 'Error occured'
    else
      set_status "Photo ID: #{response.id}"
    callback(response) if callback?


# Post a sample item to the user's feed
post_to_users_feed = (callback) ->
  body = 'Reading JS SDK documentation'
  set_status 'Posting to feed...'
  data = 
    picture: "https://s3.amazonaws.com/banters.com-produciton/posts/13483/original?1333982098"
    message: body
    caption: "Caption for your post"
    name: "Title of your post"
    description: "Description of your post"
    
  FB.api '/me/feed', 'post', data, (response) ->
    if (!response || response.error)
      console.log response
      set_status 'Error occured'
    else
      set_status "Post ID: #{response.id}"
    callback(response) if callback?


# Set up events
($ document).ready ->
  ($ '#post_to_feed').click (-> post_to_users_feed null)

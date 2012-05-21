## Facebook Coffee Demo

This is a very bare bones starter-kit for working with the Facebook Javascript SDK using coffeescript.

Facebook docs are available [here](http://developers.facebook.com/docs/reference/javascript/).

Checkout [coffee/index.coffee](coffee/index.coffee) for the code samples, otherwise to set up the demo follow the instructions in the next section.

#### Setup

In order to run this demo, you must serve the index.html file from a domain, (and not 'file://...').

On OSX, I added these lines to `/etc/apache2/extra/httpd-vhosts.conf`:  

```
<VirtualHost *:80>  
  ServerName fb_coffee_demo.com  
  ServerAlias fb_coffee_demo.com  
  DocumentRoot "/Users/goggin/projects/coffee/facebook_sdk"  
  <Directory /Users/goggin/projects/coffee/facebook_sdk>  
    Allow from all   
  </Directory>    
</VirtualHost>
```

Of course, change the 2 paths there to wherever you have downloaded these files.

And these lines to `/etc/hosts`:  
`
127.0.0.1       fb_coffee_demo.com
`

If you chose a domain different than `fb_coffee_demo.com`, then replace `fb_coffee_demo.com` with your domain in index.coffee.

After kicking apache with `sudo apachectl graceful`, I can now visit fb_coffee_demo.com in my browser.

### Setting up your Facebook App
Edit `index.coffee` and add your appropriate application ID.  Also, make sure that your "site url" is set to "fb_coffee_demo.com" in your facebook app.  

### Editing
Run this command from the directory `index.html` lives in if you are making edits to the coffee files:  
`coffee --watch -o javascript -c coffee`  


title: Install Errbit 4.x
date: 2015-10-09 20:49:47
categories:
- MIS
tags:
- errbit
---

## Install Errbit 4.x on nginx with configurations
###### nginx already configured with passenger

Install [MongoDB](https://www.mongodb.org/downloads#production)

Install [errbit](https://github.com/errbit/errbit)
```bash
cd /var/webapps/
git clone https://github.com/errbit/errbit.git
cd errbit
bundle install
```

<!-- more -->
Initial database and compile assets
```bash
rake errbit:bootstrap RAILS_ENV=production
rake assets:precompile
```

Configuration
```bash
cp .env.default .env
vim .env
```

Errbit site config
{% codeblock lang:nginx /etc/nginx/sites-available/errbit.conf %}
server {
    server_name errbit.example.com;
    root /var/webapps/errbit/public;
    passenger_sticky_sessions on;
    passenger_enabled on;
}
{% endcodeblock %}

Enable and start in nginx
```bash
ln -s /etc/nginx/sites-available/errbit.conf /etc/nginx/sites-enabled/
service nginx resart
```
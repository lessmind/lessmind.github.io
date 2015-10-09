title: Nginx with Passenger
date: 2015-10-09 20:58:51
categories:
- MIS
tags:
- nginx
- passenger
---

## install a nginx server integrating Passenger
###### using ruby in RVM for Passenger, also included bundler with RVM

{% codeblock lang:bash %}
# Install RVM for server
curl -sSL https://get.rvm.io | sudo bash -s stable --ruby

# speed up gem install by avoiding docs
echo "gem: --no-ri --no-rdoc" > ~/.gemrc

# install Bundler using RVM
gem install rubygems-bundler
{% endcodeblock %}

Install Passenger follow [official introduction](https://www.phusionpassenger.com/library/install/nginx/install/oss/)

Then setup RVM ruby for passenger
{% codeblock lang:bash %}
passenger-config about ruby-command
# copy output after "To use in Nginx" to /etc/nginx/nginx.conf
{% endcodeblock %}
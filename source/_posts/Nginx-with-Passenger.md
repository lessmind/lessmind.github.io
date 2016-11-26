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
vim /etc/group # add all user using rvm into rvm group

# speed up gem install by avoiding docs
echo "gem: --no-ri --no-rdoc" > ~/.gemrc

# install Bundler using RVM
gem install rubygems-bundler
gem install bundler
{% endcodeblock %}

Install Passenger follow [official introduction](https://www.phusionpassenger.com/library/install/nginx/install/oss/)

Then setup RVM ruby for passenger
{% codeblock lang:bash %}
passenger-config about ruby-command
{% endcodeblock %}

Copy output after "To use in Nginx" to /etc/nginx/passenger.conf
Should look like this
{% codeblock lang:nginx /etc/nginx/passenger.conf%}
passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
passenger_ruby /usr/local/rvm/gems/ruby-2.3.0/wrappers/ruby;
# replace /usr/bin/passenger_free_ruby to realpath from `passenger-config about ruby-command`
{% endcodeblock %}

title: RabbitMQ server install
date: 2015-11-26 17:26:31
categories:
- MIS
tags:
- RabbitMQ
- MQ
- message queue
---
Install (Ubuntu/Debian)
[PackageCloud RabbitMQ repository instructions](https://packagecloud.io/rabbitmq/rabbitmq-server/install)
Or checkout how to install in [other systems](https://www.rabbitmq.com/download.html)
{% codeblock lang:bash %}
apt-get install rabbitmq-server
{% endcodeblock %}

<!-- more -->

Add a new admin user (I don't like the default _guest_ user, and you can only access it within localhost since 3.3.0)
{% codeblock lang:bash %}
rabbitmqctl add_user admin your_password # use any username/password
rabbitmqctl set_user_tags admin administrator # tag as an administrator to grant full acess
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
{% endcodeblock %}

Enable web management panel
{% codeblock lang:bash %}
rabbitmq-plugins enable rabbitmq_management
{% endcodeblock %}

Then checkout your http://host.to.rabbimq.com:15672/

If got any connection problam, make sure rabbit not blocking by `ufw`
{% codeblock lang:bash %}
sudo ufw allow 5672
sudo ufw allow 15672
{% endcodeblock %}

Change file descriptors limits to 4096
{% codeblock lang:bash /etc/rabbitmq/rabbitmq-env.conf %}
ulimit -S -n 4096
{% endcodeblock %}

Chane disk free limit
{% codeblock lang:python /etc/rabbitmq/rabbitmq.config %}
[
        {rabbit, [{disk_free_limit, "64GB"}]}
].
{% endcodeblock %}

Show current configs
```bash
rabbitmqctl status
```
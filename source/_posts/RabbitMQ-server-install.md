title: RabbitMQ server install
date: 2015-11-26 17:26:31
category:
- MIS
tags:
- RabbitMQ
- MQ
---
Install (Ubuntu/Debian)
[PackageCloud RabbitMQ repository instructions](https://packagecloud.io/rabbitmq/rabbitmq-server/install)
Or checkout how to install in [other systems](https://www.rabbitmq.com/download.html)

Add a new admin user (I don't like the default _guest_ user, and you can only access it whtin localhost since 3.3.0)
{% codeblock lang:bash %}
rabbitmqctl add_user admin password # use any username/password
rabbitmqctl set_user_tags admin administrator # tag as an administrator to grant full acess
rabbitmqctl set_permissions -p / administrator ".*" ".*" ".*"
{% endcodeblock %}

Enable web management panel
{% codeblock lang:bash %}
rabbitmq-plugins enable rabbitmq_management
{% endcodeblock %}

Then checkout your http://host.to.rabbimq.com:15672/
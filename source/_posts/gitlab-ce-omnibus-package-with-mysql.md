title: Configure Gitlab CE (Omnibus package) to work with MySQL
date: 2016-11-18 15:22:39
tags:
- gitlab
- mysql
---
Mostly follow instructions [here](https://blog.vitalis.io/posts/2016/04/04/gitlabce-omnibus-mysql/), thanks for [vitalis](https://blog.vitalis.io/)

This post just created in case that post gone, and some personal note.

<!-- more -->

First, install gitlab-ce by the official instructions, and create a mysql database and a user with access ready for gitlab.

Here goes the configurations

Switch db adaptor to mysql2, fill up connection info, disable PostgreSQL
{% codeblock lang:ruby /etc/gitlab/gitlab.rb %}
# configure to use mysql
gitlab_rails['db_adapter'] = "mysql2"
gitlab_rails['db_encoding'] = "utf8" # must be utf8, utf8mb4 will cause index size too large error
gitlab_rails['db_database'] = "gitlabhq_production"
gitlab_rails['db_username'] = "gitlab"
gitlab_rails['db_password'] = "gitlabdb"
gitlab_rails['db_host'] = "127.0.0.1"
gitlab_rails['db_port'] = 3306
postgresql['enable'] = false
{% endcodeblock %}

Build `mysql2` gem
```bash
apt install libmysqlclient-dev gcc # need some dependency
cd /opt/gitlab/embedded/bin/ # use the gem binary package builded
./gem install mysql2 -- --with-mysql-lib=/usr/lib64/mysql
```

Tell GitLab bundle to ignore PostgreSQL instead of MySQL
(will be revert if gitlab-ce updated, need to manuallly redo when update)
{% codeblock lang:bash /opt/gitlab/embedded/service/gitlab-rails/.bundle/config %}
---
BUNDLE_RETRY: "5"
BUNDLE_PATH: "/opt/gitlab/embedded/service/gem"
BUNDLE_JOBS: "9"
BUNDLE_WITHOUT: "development:test:postgres"
BUNDLE_DISABLE_SHARED_GEMS: "true"
{% endcodeblock %}

Install bundle
```bash
cd /opt/gitlab/embedded/service/gitlab-rails
/opt/gitlab/embedded/bin/bundle install
```
Reconfigure & restart gitlab
```bash
gitlab-ctl reconfigure
gitlab-ctl restart
gitlab-rake gitlab:setup
```
title: Redmine repositories from gitolite
date: 2015-10-11 14:47:04
categories:
- MIS
tags:
- gitolite
- redmine
---

Only two steps:

1. Let www-data have read access of /path-to-gitolite-root/repositories
{% codeblock lang:bash %}
cd /path-to-gitolite-root

# let all repos readable for all users, but not writable except owner
chmod a+rX,go-w -R repositories

# keep gitolite-admin remains only readable/writable by owner
chmod go-rwX -R repositories/gitolite-admin.git
{% endcodeblock %}

2. Keep it that way when gitolite add any new things
{% codeblock lang:bash /path-to-gitolite-root/.gitolite.rc %}
%RC = (
	...
	#UMASK => 0077,
	UMASK => 0022, # now any new repo will keep rx permissions of groups & others
	...
{% endcodeblock %}
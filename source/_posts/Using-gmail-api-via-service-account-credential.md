title: Using gmail api via service account credential
date: 2015-12-08 20:36:33
tags:
- Google API
- php
---
For some reason, I need to grab a mail attachment to store its content into database everyday.

So obviously I can't use the normal OAuth approach because no one can authorized this action every day, that leaves **service account** to get this thing done.

First, I need a service account, follow the [instructions](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) of **Creating a service account** section

And as a service account to access gmail, I have to impersonate as some real user to access thier mails, I could only do that in a Google Apps for Work domain.

To do so, I checked the next section of [document](https://developers.google.com/identity/protocols/OAuth2ServiceAccount), **Delegating domain-wide authority to the service account**.

But I can't find the **client id** on the web console anywhere, I do find one client_id field in the .json key file though, which the **Manage API client access** panel doesn't accept it at all.
<!-- more -->
And I can't find any solution on google search / google products forum / stackoverfow either, then I finally found something on th developer console, thanks to my co-worker.

In the **Credentials** panel, go to the **Manage service accounts link** (on the top-right corner of service account credentails table), click the little icon on the end of the service account row, click Edit, then there's a popup with a input text to change account name, **AND** a checkbox called **Enable Google Apps Domain-wide Delegation**.

After that, I finally got a client id on developer console, and able to authenticate something on the **Manage API client access** panel.

But it's not done yet, I should use the **sub** parameter in **Google_Auth_AssertionCredentials** to specify which user to impersonate.

{% codeblock lang:php %}
$credential = new Google_Auth_AssertionCredentials(
	'service-account@with-some-dummy-domain',
	$scopes, // should be the same as the scope in Manage API client access panel
	file_get_contents('/path/to/p12/key/file'),
	'notasecret', // the default password
	'http://oauth.net/grant_type/jwt/1.0/bearer', // assertionType
	'some@real-user.com' // the user mail to impersonate
);
{% endcodeblock %}

Now we're done.
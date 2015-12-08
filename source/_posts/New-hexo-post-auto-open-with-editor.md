title: New hexo post auto open with editor
date: 2015-10-13 08:51:56
tags:
- hexo
---
Just add a simple script (from [here](https://github.com/hexojs/hexo/issues/1007))
{% codeblock lang:JavaScript /path-to-hexo-root/scripts/open-new.js %}
var exec = require('child_process').exec;
hexo.on('new', function(data) {
    exec('hexo server'); // start preview server
    setTimeout(function() {
    	// couldn't find a server started event
    	// so just workaround to do in 3s later
        exec('open -a "Google Chrome" "http://0.0.0.0:4000"'); // open preview url
        // open with editor (in this case using Sublime Text and also open cwd together)
        exec('open -a "Sublime Text" '+process.cwd()+' '+data.path);
    }, 3000);
});
{% endcodeblock %}
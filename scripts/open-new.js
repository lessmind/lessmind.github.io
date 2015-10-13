var exec = require('child_process').exec;
hexo.on('new', function(data) {
    exec('hexo server');
    setTimeout(function() {
        exec('open -a "Google Chrome" "http://0.0.0.0:4000"');
        exec('open -a "Sublime Text" ~/Documents/sublime-projects/lessmind-github-to.sublime-workspace '+data.path);
    }, 3000);
});
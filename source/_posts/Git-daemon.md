title: Git daemon
date: 2015-10-15 13:29:43
categories:
- MIS
tags:
- git
- git-daemon
---
Create a daemon for readonly git clone access
```bash
git daemon --base-path=/path-to-gitolite/repositories --export-all
# --export-all option to export all repos
# or touch a git-daemon-export-ok file under repos needs to be export

# how to access
git clone git://git.example.com/ex-repo
```
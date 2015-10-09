title: mutt on OS X
date: 2015-10-09 21:03:15
categories:
- mac
tags:
- mutt
- OS X
---

Need [Homebrew](http://brew.sh/)

```bash
brew install mutt

# made mutt to read mail from /var/mail
echo 'set spoolfile=/var/mail/$USER' > ~/.muttrc

# grant permission to edit mail or it will be read-only
dseditgroup -o edit -u $USER -p -a $USER -t user mail
```

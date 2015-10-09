title: Moving gitolite
categories:
- MIS
tags:
  - git
  - gitolite
date: 2015-10-09 20:48:50
---

## Step by step introdutions to move a gitolite server
###### maybe pack these into a script one day

### Definitions:
* OLD - your old gitolite server
* NEW - your clean shiny new gitolite server
* ADMIN - doesn't matter, any machine can execute git and have gitolite-admin acces in **OLD**
<!-- more -->
### on **OLD**
pack old things up!
```bash
su git
cd ~
tar cf pack.tar repositories/ .gitolite.rc .gitolite/hooks/common
```

### on **NEW**
use `sudo` whenever you need it

install git
```bash
apt-get install git
```
create gitolite user
```bash
useradd -d /opt/gitolite -m -p "!" -s /bin/bash git
```
intall gitolite
```bash
su git
cd ~
echo "pubkey on ADMIN" > [USER].pub # create admin key
git clone https://github.com/sitaramc/gitolite.git
mkdir -p ~/bin
./gitolite/install -ln ~/bin
gitolite setup -pk [USER].pub
```
get old repos back
```bash
mkdir ~/tmp
scp OLD:pack.tar ~/tmp
cd ~/tmp
tar zxf pack.tar
rm -rf repositories/gitolite-admin.git repositories/testing.git/ # rm default repos
mv repositories/* ~/repositories/
```
apply rc configs if the gitolite version between OLD and NEW are close enough

or check any diff of ~/.gitolite.rc and ~/tmp/.gitolite.rc to manually apply it
```bash
cp ~/tmp/.gitolite.rc ~/
```
restore hooks (this probably getting old, check [this](http://gitolite.com/gitolite/cookbook.html#cb-hooks) to manage hooks)
```bash
cp ~/tmp/.gitolite/hooks/common/* ~/.gitolite/hooks/common/
```

### on ADMIN
get a newest admin configs
```bash
git clone git@OLD:gitolite-admin
cd gitolite-admin
```
set new origin
```bash
git remote set-url origin git@NEW:gitolite-admin
```
test is the admin key worked
```bash
git fetch origin
```
push configs
```bash
git push -f
```
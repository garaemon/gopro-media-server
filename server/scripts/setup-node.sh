#!/bin/bash

if [ ! -e ~/.nvm ]; then
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh
fi
source ~/.nvm/nvm.sh
nvm install v0.10.28

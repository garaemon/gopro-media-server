#!/bin/bash
set -e

# it requires mplayer
function say { mplayer "http://translate.google.com/translate_tts?tl=ja&q=$1" > /dev/null 2>&1; }

say "$*"

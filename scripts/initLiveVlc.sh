#!/bin/sh

dir=${0%/*}

/Applications/VLC.app/Contents/MacOS/VLC --fullscreen --no-osd --no-video-title-show --video-on-top --no-media-library --repeat $1

#!/usr/bin/env bash

# Whiptail configuration
export NEWT_COLORS='root=,black
    roottext=red,white
    entry=red,white'
SETUP_WINDOW_TITLE="Script to push to gh-pages"
WINDOW_HEIGHT=10
WINDOW_WIDTH=100

function show_yesno_box(){
    whiptail --title "Conditional action:" --backtitle "${SETUP_WINDOW_TITLE}" --yesno "$1" ${WINDOW_HEIGHT} ${WINDOW_WIDTH}
}

if show_yesno_box "Push to github pages?"; then
    npm run test

    if [ $? -ne 0 ]; then
        echo "Tests must pass before commit."
        exit 1
    fi

    git checkout gh-pages
    git merge master --no-edit --strategy-option=theirs
    git push --no-verify
    git checkout master
    git push --no-verify
fi


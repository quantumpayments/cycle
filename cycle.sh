#!/bin/bash

export WEBID="http://melvincarvalho.com/#me"
export TEST="https://localhost/wallet/test/wallet#this"
export WORKBOT="https://workbot.databox.me/profile/card#me"

export THRESHOLD=25
export AMOUNT=5

credit insert $WORKBOT 5 '' $WEBID work -d test -w $TEST

BALANCE=$(credit balance $WEBID -d test -w $TEST)
if [[ $BALANCE -ge $THRESHOLD ]]
then
  credit insert $WORKBOT $THRESHOLD '' $WEBID -d test -w $TEST
fi

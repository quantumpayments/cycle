# cycle
cycles through ledger payments with limited liquidty

# prerequisites

setup `basic` ledger

uses `hook` workflow

# description

cycle is a workflow where ledger transactions flow in a cycles, this ensures in systems with limited liquidity payments can keep flowing

in a typcial scenario you have two actors, say, workbot and webid

workbot pays the webid periodically based on work performed

a post insert hook will check that the webid balance is not above a certain threshold, if it is, a transaction is made from webid to workbot for amount transaction

# implementation


    THRESHOLD=25
    AMOUNT=5
    credit insert $WORKBOT $AMOUNT '' $WEBID work 
    BALANCE=$(credit balance $WEBID)
    if [[ $BALANCE -gt $THRESHOLD ]]
    then
      credit insert $WORKBOT $THRESHOLD '' $WEBID
    fi

The rebalancing doesnt need to run on an insert, it can run periodically or on demand

# example

You may wish to log your bash commands, with 5 bits awarded for each command.  Every 25 points accumulated, you send the bits back to the points issuer so that you can keep a record of your work


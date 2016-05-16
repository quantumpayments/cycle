#!/usr/bin/env node

var wc = require('webcredits')

var config = wc.getConfig();
var sequelize = wc.setupDB(config);

console.log(config)

var source      = 'https://workbot.databox.me/profile/card#me'
var amount      = 5
var destination = 'https://melvincarvalho.com/#me'
var currency    = 'https://w3id.org/cc#bit'

var threshold   = 30


function createCredit(source, amount, currency, destination) {
  var credit = {}

  var defaultCurrency = 'https://w3id.org/cc#bit'

  if (source) {
    credit["https://w3id.org/cc#source"] = source
  } else {
    return
  }

  if (amount) {
    credit["https://w3id.org/cc#amount"] = amount
  } else {
    return
  }

  if (destination) {
    credit["https://w3id.org/cc#destination"] = destination
  } else {
    return
  }

  if (currency) {
    credit["https://w3id.org/cc#currency"] = currency
  } else {
    credit["https://w3id.org/cc#currency"] = defaultCurrency
  }

  return credit
}


var credit1 = createCredit(source, amount, currency, destination)
var credit2 = createCredit(destination, threshold, currency, source)


wc.insert(credit1, sequelize, config, function(err, res) {
   if (!err) {
     console.log(res)

     // hook 1
     wc.getBalance(destination, sequelize, config, function(err, res){

       if (!err) {
         console.log('fetched balance is : ' + res)

         // hook 2
         if (res >= threshold) {
           wc.insert(credit2, sequelize, config, function(err, res) {
              if (!err) {
                console.log(res)
              } else {
                console.error(err)
              }
            })
         }

       } else {
         console.error(err)
       }

     })

   } else {
     console.error(err)
   }
})

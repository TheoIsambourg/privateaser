'use strict';

//list of bars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [
{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, 
{
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, 
{
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [
{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': 
  {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': 
  {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }

}, 

{
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

//for each event of the events array we want to modify the price of 
//the current event by updating the price key with my function


function updatePrice()
{
var timeComponent = 0;
var peopleComponent = 0;


  for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
  {
         for (var compteurBars=0 ; compteurBars<bars.length; compteurBars++)
      {
         
          if (events[compteurEvents].barId == bars[compteurBars].id)
          {
            timeComponent = events[compteurEvents].time*bars[compteurBars].pricePerHour;
            peopleComponent = events[compteurEvents].persons*bars[compteurBars].pricePerPerson;
            events[compteurEvents].price = timeComponent+peopleComponent;
          }

      }


  }
}



function decreasingPricing()

{
   for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
  {
     
         
          if (events[compteurEvents].persons > 10 && events[compteurEvents].persons<=20)
          {
            events[compteurEvents].price = events[compteurEvents].price-(events[compteurEvents].price*10/100);
          }

          if (events[compteurEvents].persons > 20 && events[compteurEvents].persons<=30)
          {
            events[compteurEvents].price = events[compteurEvents].price-(events[compteurEvents].price*20/100);
          }

          if (events[compteurEvents].persons > 30)
          {
            events[compteurEvents].price = events[compteurEvents].price-(events[compteurEvents].price*30/100);
          }


  }

}



function commission()

{

for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
  { 
   events[compteurEvents].commission.insurance = (events[compteurEvents].price*30/100)/2;
   events[compteurEvents].commission.treasury = events[compteurEvents].persons;
   events[compteurEvents].commission.privateaser = (events[compteurEvents].price*30/100) - events[compteurEvents].commission.insurance - events[compteurEvents].commission.treasury;
  }

}



function deductible()

{
    for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
  { 
    if (events[compteurEvents].options.deductibleReduction==true)
    {
      events[compteurEvents].price = events[compteurEvents].price + events[compteurEvents].persons;
    }

  }

}


function payActors()
{

 for (var compteurActors=0 ; compteurActors<actors.length; compteurActors++)
  { 

    for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
    {
      for (var compteurWho=0 ; compteurWho<5; compteurWho++)
    {


        if (actors[compteurActors].payment[compteurWho].who == 'booker' && events[compteurEvents].id==actors[compteurActors].eventId)
        {
          actors[compteurActors].payment[compteurWho].amount=events[compteurEvents].price;
        }
      }
    }

  }




   for (var compteurActors=0 ; compteurActors<actors.length; compteurActors++)
  { 

    for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
    {

       for (var compteurWho=0 ; compteurWho<5; compteurWho++)
    {

        if (actors[compteurActors].payment[compteurWho].who == 'bar' && events[compteurEvents].id==actors[compteurActors].eventId)
        {
          actors[compteurActors].payment[compteurWho].amount=events[compteurEvents].price-(events[compteurEvents].price*30/100);
        }
    }
  }

  }


for (var compteurActors=0 ; compteurActors<actors.length; compteurActors++)
  { 

    for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
    {

      for (var compteurWho=0 ; compteurWho<5; compteurWho++)
    {

        if (actors[compteurActors].payment[compteurWho].who=='insurance' && events[compteurEvents].id==actors[compteurActors].eventId)
        {
          actors[compteurActors].payment[compteurWho].amount=events[compteurEvents].commission.insurance;
        }

      }

    }

  }


for (var compteurActors=0 ; compteurActors<actors.length; compteurActors++)
  { 

    for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
    {

      for (var compteurWho=0 ; compteurWho<5; compteurWho++)
    {

        if (actors[compteurActors].payment[compteurWho].who=='treasury' && events[compteurEvents].id==actors[compteurActors].eventId)
        {
          actors[compteurActors].payment[compteurWho].amount=events[compteurEvents].commission.treasury;
        }

      }

    }

  }


for (var compteurActors=0 ; compteurActors<actors.length; compteurActors++)
  { 

    for (var compteurEvents=0 ; compteurEvents<events.length; compteurEvents++)
    {

      for (var compteurWho=0 ; compteurWho<5; compteurWho++)
    {

        if (actors[compteurActors].payment[compteurWho].who=='privateaser' && events[compteurEvents].id==actors[compteurActors].eventId)
        {
          actors[compteurActors].payment[compteurWho].amount=events[compteurEvents].price;
        }

      }

    }

  }







}



updatePrice();
decreasingPricing();
commission();
deductible();
payActors();



console.log(bars);
console.log(events);
console.log(actors);






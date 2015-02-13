$(document).on('ready', function() {

  ////////////////////////////////////////
  //CALCULATES THE BOLUS INSULIN DOSAGE//
  //////////////////////////////////////
  
  var BolusCalc = function(carbohydrateIntake, carbToInsulinRatio, correctionFactorInsulinRatio, currentBloodGlucose, desiredBloodGlucose) {
  	this.carbohydrateIntake = carbohydrateIntake;
  	this.carbToInsulinRatio = carbToInsulinRatio;
  	this.correctionFactorInsulinRatio = correctionFactorInsulinRatio;
  	this.currentBloodGlucose = currentBloodGlucose;
  	this.desiredBloodGlucose = desiredBloodGlucose;  
  }	
    
  BolusCalc.prototype.calculate = function() {
  	var foodBolus = this.carbohydrateIntake / this.carbToInsulinRatio;

  	var correctiveBolus = (this.currentBloodGlucose - this.desiredBloodGlucose) / this.correctionFactorInsulinRatio;

  	var totalBolus = foodBolus + correctiveBolus;

  	return totalBolus; 
  }

  // Troubleshoot NAN - Prevent users from entering fictious inputs//

  $(".bolusCalcButton").on("click", function() {
      var helpme = $("[name='Carbohydrate Intake']").val();
     var carbohydrateIntake = (helpme === " ")? 0:  parseInt(helpme);
     var carbToInsulinRatio = parseInt($("[name='Carb to Insulin Ratio']").val()); 
     var correctionFactorInsulinRatio = parseInt($("[name='Correction Factor / Insulin Sensitivity']").val());
     var currentBloodGlucose = parseInt($("[name='Current Blood Glucose']").val());
     var desiredBloodGlucose = parseInt($("[name='Desired Blood Glucose']").val());

     var thisBolusCalc = new BolusCalc(carbohydrateIntake, carbToInsulinRatio, correctionFactorInsulinRatio, currentBloodGlucose, desiredBloodGlucose);

     var bolusTotal = thisBolusCalc.calculate()
     console.log(bolusTotal);

     $("#bolusCalcResult").text(bolusTotal + " units of insulin"); 

  })

  ///////////////////////////////////
  //CREATES AN ARRAY OF FOOD ITEMS//
  /////////////////////////////////

  var foodList = [];

  var Food = function(name, carbohydrates) {
  	this.name = name;
    this.carbohydrates = carbohydrates;
    foodList.push(this); 
  }

  //"DIRECTORY" OF FOODS//

  var milk = new Food("Milk, 8oz", 12);
  var cheerios = new Food("Cheerios, 1cup", 22); 
  var orangeJuice = new Food("Orange Juice, 8oz", 33);

  var pancake = new Food("Pancake, 6in dia", 22); 

  var pizza = new Food("Pizza, 1 slice", 20);
  var hamburger = new Food("Hamburger, double patty", 29);
  var steak = new Food("Steak, 300g", 0);
  var salmon = new Food("Salmon, Fillet, 200g", 0);
  
  var apple = new Food("Apple", 31);
  var banana = new Food("Banana", 27); 
  var orange = new Food("Orange", 11);

  var snickersBar = new Food("Snickers Bar", 33);

  var bread = new Food("Bread, white", 15); 
  var tuna = new Food("Tuna, light, canned, in water", 0);
  var lettuce = new Food("Lettuce, looseleaf", 0);
  var mayonnaise = new Food("Mayonnaise, 1TB", 0);

  //APPENDS FOOD ITEMS AND CARB VALUES TO THE DOM//

  for(var i=0; i<foodList.length; i++) {
    $("#foodBox").prepend("<div>" + foodList[i].name + " " + "<input type='checkbox' class='food-item' value='" + foodList[i].carbohydrates + "'>" + "</div>");
  }

  //SUMS CARB VALUES FOR CHECKED BOXES AND INSERTS THEM INTO THE CARBOHYDRATE INTAKE INPUT//

  $("#foodBoxButton").on("click", function() {
    var total = 0;
    $(".food-item:checked").each(function() {
      console.log($(this));
      total += +$(this).val();
    }) 
    
    $("#CarbIntake").val(total)

  })


});


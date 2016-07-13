var fs = require('fs');
exports.purchasesData = function(filePath){
	var lines = fs.readFileSync(filePath, "utf8")
  .replace("Shop;Date;Item;Quantity;Cost;Total Cost\n", "")
  .replace(/,/g, ".")
  .split('\n');

  var purchasesArray = [];

  for (i = 0; i < lines.length - 1; i++) {
    purchasesArray.push(lines[i].split(";"));
  }
  var week0purchases = [];
  var week1purchases = [];
  var week2purchases = [];
  var week3purchases = [];
  var week4purchases = [];

  purchasesArray.forEach(function(purchase){
    var date = new Date(purchase[1] + '2016');

    var endDate0 = new Date('01-Feb-2016');
    var endDate1 = new Date('08-Feb-2016');
    var endDate2 = new Date('15-Feb-2016');
    var endDate3 = new Date('22-Feb-2016');
    var endDate4 = new Date('02-Mar-2016');

    if(date < endDate0){
      week0purchases.push(purchase);
    }
    if(date > endDate0 && date < endDate1){
      week1purchases.push(purchase);
    }
    if(date > endDate1 && date < endDate2){
      week2purchases.push(purchase);
    }
    if(date > endDate2  && date < endDate3){
      week3purchases.push(purchase);
    }
    if(date > endDate3 && date < endDate4){
      week4purchases.push(purchase);
    }
  });

  purchases = {
    "week0": week0purchases,
    "week1": week1purchases,
    "week2": week2purchases,
    "week3": week3purchases,
    "week4": week4purchases
  };
  return (purchases);
};
exports.purchasesPerWeek = function(purchases,week){

  var purchasesList = [];
  purchases[week].forEach(function(array) {
    purchasesList.push([array[2], Number(array[5].replace(/R/g,""))]);
  });
  var weeklyPurchases = {};

  purchasesList.forEach(function(array) {

    if (!weeklyPurchases.hasOwnProperty(array[0])) {
      weeklyPurchases[array[0]] = 0;
    }
      weeklyPurchases[array[0]] += array[1];
  });
  return weeklyPurchases;	
}

exports.profitMapping = function(weeklyPurchases, weeklySales){
	var profitMap = {};
    var profit = {};

 	 for(product in weeklyPurchases){
    for(key in weeklySales){
      if(product === key){
        profitMap[product] = weeklyPurchases[product] - weeklySales[key];
      }
    }
   }
 	return profitMap;
};

exports.mostProfitableProduct = function(profitMap){
  var profitObj = {};
  var max = 0;

  for(var key in profitMap){
    if(profitMap[key] > max){
      max = profitMap[key];
      profitObj = {
        desc: "Most Profitable Product",
        product : key,
        profitAmount : max
      }
    }
  }
  
  return profitObj;
}

exports.catProfit = function(profitMap){
  var categoryProfitMap = { 'Milk 1l': 'Dairy Products',
    Imasi: 'Dairy Products',
    Bread: 'Bakery',
    'Chakalaka Can': 'Canned Food',
    'Gold Dish Vegetable Curry Can': 'Canned Food',
    'Fanta 500ml': 'Fizzy Drinks',
    'Coke 500ml': 'Fizzy Drinks',
    'Cream Soda 500ml': 'Fizzy Drinks',
    'Iwisa Pap 5kg': 'Bulk',
    'Top Class Soy Mince': 'Soup',
    'Shampoo 1 litre': 'Cosmetic',
    'Soap Bar': 'Cosmetic',
    'Bananas - loose': 'Fruit',
    'Apples - loose': 'Fruit',
    'Mixed Sweets 5s': 'Confectionery',
    'Heart Chocolates': 'Confectionery',
    'Rose (plastic)': 'Valentines Goodies',
    'Valentine Cards': 'Valentines Goodies' 
  };

  var catProfitMap = {};

  for (var product in profitMap){
    var category = categoryProfitMap[product];
    if (catProfitMap[category] === undefined){
      catProfitMap[category] = 0;
    }
    var catProfit = profitMap[product];
    catProfitMap[category] = catProfitMap[category] + catProfit; 
  }
  //console.log(catProfitMap);
  var mostProfitableCategory = {};
    var max = 0;

    for(var cat in catProfitMap) {
      var value = catProfitMap[cat];
      if(catProfitMap[cat] > max){
        max = catProfitMap[cat];
        mostProfitableCategory = {
          desc: "Most Profitable Category",
          category: cat,
          profitAmount: max
        }
      }
    }
  return mostProfitableCategory;
};
//require modules
var handlebars = require('handlebars'); //reqire handlebars
var fs = require('fs'); // require fs module


//get data files
var popularProd = require('./products'); // js file that provides data
var purch = require('./purchases');
var week = process.argv[2];

var filePath = './csv-files/'+ week + '.csv'

// requiring functions
var productList = popularProd.salesData(filePath);
var purchasesList = purch.purchasesData('./csv-files/purchases.csv')
var productMap = popularProd.groupByQuantity(productList);
var week1PopProduct = popularProd.mostPopularProd(productMap); //content that I want to display
var leastPop = popularProd.leastPopularProd(productMap,54);
var popCat = popularProd.mostPopularCat(productMap);
var leastCat = popularProd.leastPopularCat(productMap,109);
var weeklySales = popularProd.salesPerWeek(productList)
var weeklyPurchases = purch.purchasesPerWeek(purchases,"week1")
var profitMap = purch.profitMapping(weeklySales,weeklyPurchases)
var profitProd = purch.mostProfitableProduct(profitMap)
var profitCat = purch.catProfit(profitMap);

var data = {
	sales : [week1PopProduct, leastPop, popCat,leastCat,profitProd,profitCat]
};

//get template
var source = fs.readFileSync('./views/layouts/products.hbs', "utf8");

//compile meaning create the template
var template = handlebars.compile(source);
//var context = week1PopProduct;

//combine template and data
var result = template(data);
fs.writeFileSync(week + '_sales.html', result);

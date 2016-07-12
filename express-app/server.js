var express = require('express');
var handlebars = require('handlebars');
var fs = require('fs');
var exphbs = require('express-handlebars');
var products = require('../products');
var purch = require('../purchases');

var sales = ('/sales');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// create a route
app.get('/', function (req, res) {
 res.send('Hello World!');
});

app.get('/hello', function(req, res){
	res.render('hello')
});

app.get('/sales/:week_name',function(req,res){
	var week = req.params.week_name;
	//console.log(week);

	var filePath = '../csv-files/'+ week + '.csv'

 	//get data files
	var popularProd = require('../products'); // js file that provides data
	var purch = require('../purchases');

	// requiring functions
	var productList = popularProd.salesData(filePath);
	var purchasesList = purch.purchasesData('../csv-files/purchases.csv')
	var productMap = popularProd.groupByQuantity(productList);
	var weekPopProduct = popularProd.mostPopularProd(productMap); //content that I want to display
	var leastPop = popularProd.leastPopularProd(productMap,54);
	var popCat = popularProd.mostPopularCat(productMap);
	var leastCat = popularProd.leastPopularCat(productMap,109);
	var weeklySales = popularProd.salesPerWeek(productList)
	var weeklyPurchases = purch.purchasesPerWeek(purchases, week)
	var profitMap = purch.profitMapping(weeklySales,weeklyPurchases)
	var profitProd = purch.mostProfitableProduct(profitMap)
	var profitCat = purch.catProfit(profitMap);

	var data = {
		sales : [weekPopProduct, leastPop, popCat,leastCat,profitProd,profitCat]
	};

	//get template
	var source = fs.readFileSync('../views/layouts/products.hbs', "utf8");

	//compile meaning create the template
	var template = handlebars.compile(source);
	//var context = week1PopProduct;

	//combine template and data
	var result = template(data);
	res.send(week +'_sale.html', result);
});

// app.get('/sales/:week_name',function(req, res){
	

// 	var week = process.argv[2];

// 	var filePath = '../csv-files/'+ week + '.csv'

// 	//necessary function that will get you the data you need
// 	var productList = products.salesData(filePath);
// 	var productMap = products.groupByQuantity(productList);
// 	var mostPopProd = products.mostPopularProd(productMap);
// 	var leastPopProd = products.leastPopularProd(productMap, 54);
// 	var mostPopCat = products.mostPopularCat(productMap);
// 	var leastPopCat = products.leastPopularCat(productMap,109);

//    //profitable supporting functions
//     var purchases = purch.purchasesData('../csv-files/purchases.csv');
//     var weeklySale = products.salesPerWeek(productList);
//     var weeklyPurchases = purch.purchasesPerWeek(purchases,"week1");
//     var profitMap = purch.profitMapping(weeklySale, weeklyPurchases);
//     //the actual functions we need
// 	var mostProfProduct = purch.mostProfitableProduct(profitMap);
// 	var mostProfCat = purch.catProfit(profitMap);
// 	//var sales = products.salesPerWeek(productList)

// 	var data = {
// 	Week: "week" + week.match(/\d+/),
// 	sales: [mostPopProd,leastPopProd,mostPopCat,leastPopCat],
// 	profit:[mostProfProduct,mostProfCat]
// 	}
// 	// introduce you template
// 	var source = fs.readFileSync('./views/sales.handlebars',"utf8");

// 	//compile meaning create the template

// 	var template = handlebars.compile(source);

// 	//combine the template and data

// 	var results = template(data);

// 	//write the html file
// 	res.send(results);
// 	//fs.writeFileSync(week + '_sales.html', results)
// });



//start the server
// var server = app.listen(3000, function (){

//  var host = server.address().address;
//  var port = server.address().port;

//  console.log('Example app listening at http://%s:%s', host, port);

// });
app.set('port', (process.env.PORT || 5000));
//start the app like this:
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
var express = require('express');
var handlebars = require('handlebars');
var fs = require('fs');
var exphbs = require('express-handlebars');
var products = require('./products');
var purch = require('./purchases');

var sales = ('/sales');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// create a route
app.get('/', function (req, res) {
 res.send('Hello World!');
});

app.get('/hello', function(req, res){
	res.send('hello codeX')
});

app.get('/sales/:week_name',function(req,res){
	var week = req.params.week_name;

	var filePath = './csv-files/'+ week + '.csv'

 	//get data files
	var popularProd = require('./products'); // js file that provides data
	var purch = require('./purchases');

	// requiring functions
	var productList = popularProd.salesData(filePath);
	var purchasesList = purch.purchasesData('./csv-files/purchases.csv')
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
	var source = fs.readFileSync('./views/layouts/products.hbs', "utf8");

	//compile meaning create the template
	var template = handlebars.compile(source);
	//var context = week1PopProduct;

	//combine template and data
	var result = template(data);
	res.send(week +'_sale.html', result);
});

app.set('port', (process.env.PORT || 5000));
//start the app like this:
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

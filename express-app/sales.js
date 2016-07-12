//require all the modules you need
var fs = require('fs');
var handlebars = require('handlebars');

//require all the files you need
var products = require('../products');

var week = process.argv[2];

var filePath = '../csv-files/'+ week + '.csv'

//necessary function that will get you the data you need
var productList = products.salesData(filePath);
var productMap = products.groupByQuantity(productList);
var sales = products.groupedList(productMap);
//var sales = products.salesPerWeek(productList)

var data = {
	Week: "week" + week.match(/\d+/),
	weekSales : sales
}
// introduce you template
var source = fs.readFileSync('./views/sales.handlebars',"utf8");

//compile meaning create the template

var template = handlebars.compile(source);

//combine the template and data

var results = template(data);

//write the html file

fs.writeFileSync(week + '_sales.html', results)


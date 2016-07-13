var fs = require('fs');
	exports.salesData = function(filePath){
		var readFile = fs.readFileSync(filePath,"utf8");
		//console.log("==========" + fs.readFileSync('csv-files/week1.csv', 'utf8'));
		lines = readFile
		.replace("Day,Date,stock item,No sold,Sales Price\n", "")
		.split('\n');

		var productList = [];
		var products = []

		for(var i = 0; i < lines.length - 1;i++){
			products.push(lines[i]);
		}

		products.forEach(function(product){
			var columns = product.split(",");
			var productName = columns[2];
			var quantity = columns[3];
			var sellingPrice = Number(columns[4].replace("R","").replace(",","."));
			

			var prodObj = {
				productName:productName,
				quantity: Number(quantity),
				sellingPrice: sellingPrice
			};
			productList.push(prodObj);
		});
		return productList;			
	};
	
	exports.groupByQuantity = function(productList){
	 	var productMap ={};

	 	productList.forEach(function(product){
	 		//console.log(product);
	 		var item = product.productName;
	 		var qty = product.quantity;

	 		if(productMap[item] === undefined){
	 			productMap[item] = 0;
	 		}

	 		productMap[item] = productMap[item] + qty;
	 	});
	 	//console.log(productMap);
	 	return productMap;
	};
	exports.groupedList = function(productMap){

		groupedSales = {};

		for(var key in productMap){
			

			groupedSales = {
				product : key,
			 	quantity: productMap[key]
			}
		}
		return groupedSales;
	}
	exports.salesPerWeek = function(productList){
		//console.log(productList);
		var weeklySales = {};

  		productList.forEach(function(sale) {
  			var product = sale.productName;
  			var sale = Number(sale.quantity * sale.sellingPrice)

    		if (!weeklySales.hasOwnProperty(product)) {
      			weeklySales[product] = 0;
    		}
      		weeklySales[product] += sale;
  		});
  		return weeklySales
	};

	exports.mostPopularProd = function(productMap){
		var mostPopularProduct = {};
		var max = 0;
		for(key in productMap){
			if(productMap[key] > max){
				max = productMap[key];

				mostPopularProduct = {
					desc:"Most popular product",
					product : key,
					quantity: max
				};
			}
		}
		return mostPopularProduct;
	}
	exports.leastPopularProd = function(productMap,max){
		var leastPopularProduct = {};
		var min = max;
		for(key in productMap){
			if(productMap[key] < min){
				min = productMap[key];

				leastPopularProduct = {
					desc : "Least popular product",
					product : key,
					quantity: min
				};
			}
		}
		return leastPopularProduct;
	}
	var productCategories = {
 			'Milk 1l': 'Dairy Products',
 			'Imasi': 'Dairy Products',
 			'Bread': 'Bakery',
 			'Chakalaka Can': 'Canned Food',
 			'Gold Dish Vegetable Curry Can': 'Canned Food',
 			'Fanta 500ml': 'Fizzy Drinks',
 			'Coke 500ml': 'Fizzy Drinks',
 			'Cream Soda 500ml': 'Fizzy Drinks',
 			'Iwisa Pap 5kg': 'Bulk',
 			'Top Class Soy Mince': 'Soup',
 			'Shampoo 1 litre': 'Cosmetics',
 			'Soap Bar': 'Cosmetics',
 			'Bananas - loose': 'Fruit',
 			'Apples - loose': 'Fruit',
 			'Mixed Sweets 5s': 'Confectionery',
 			'Heart Chocolates': 'Confectionery',
 			'Rose (plastic)': 'Valentines Goodies',
 			'Valentine Cards': 'Valentines Goodies'
 		}
	exports.mostPopularCat = function(productMap){
 		var catMap = {};

 		for (var product in productMap){
 			var category = productCategories[product];
 			if (catMap[category] === undefined){
 				catMap[category] = 0;
 			}
 			var prodQty = productMap[product];
 			catMap[category] = catMap[category] + prodQty; 
 		}
 		var mostPopularCategory = {};
 		var max = 0;

 		for(var cat in catMap) {
 			var value = catMap[cat];
 			if(catMap[cat] > max){
 				max = catMap[cat];
 				mostPopularCategory = {
 					desc: "Most popular category",
 					category: cat,
 					quantity: max
 				}
 			}
 		}
 		return mostPopularCategory;
 	};
 	exports.leastPopularCat = function(productMap,max){

 		
 		var catMap = {};

 		for (var product in productMap){
 			var category = productCategories[product];

 			if (catMap[category] === undefined){
 				catMap[category] = 0;
 			}
 			var prodQty = productMap[product];
 			catMap[category] = catMap[category] + prodQty; 
 		}

 		var leastPopularCategory = {};
 		var min = max;

 		for(var cat in catMap) {
 			var value = catMap[cat];
 			if(catMap[cat] < min){
 				min = catMap[cat];
 				leastPopularCategory = {
 					desc: "Least popular category",
 					category: cat,
 					quantity: min
 				}
 			}
 		}
 		return leastPopularCategory;	
 	}
 	exports.weeklyPurchases = function(inputPurchases){

 		var purchasesArray = [];

  		for (i = 0; i < inputPurchases.length - 1; i++) {
    		purchasesArray.push(inputPurchases[i].split(";"));
  		}

  		for (var i = purchasesArray.length - 1; i >= 0; i--) {
  			console.log(purchasesArray[i][1]);
    		}
  	}
 	exports.mostProfitableProd = function(productList,purchasesList){
 		var max = 0;
 		var mostProfitableProdObj
 		
 		purchasesList.forEach(function(purchase){
 			productList.forEach(function(sale){
 				if(purchase.productName === sale.productName){
 					var profit = Number(sale.sellingPrice - purchase.purchasePrice);
 				}
 				if(profit > max){
 					max = profit;

 					mostProfitableProdObj = {
 						desc: "Most profitable product",
 						product : purchase.item,
 						profitAmount : max
 					};
 				}
 			})
 		})
 		return mostProfitableProdObj

 	};

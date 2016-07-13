var assert = require("assert");
var products = require("../products");
var purchases = require("../purchases");

//supporting variables
var productList = products.salesData('./csv-files/week1.csv');
var myPurchases = purchases.purchasesData('./csv-files/purchases.csv');
var productMap = products.groupByQuantity(productList);
var weeklySales = products.salesPerWeek(productList);
var myPurchases = purchases.purchasesData('./csv-files/purchases.csv');
var weeklyPurchases = purchases.purchasesPerWeek(myPurchases, "week1");
var profitMap = purchases.profitMapping(weeklySales, weeklyPurchases);


describe("Find list of sales per week", function(){
    it('should return an object of products for week1', function(){
        var results = products.salesData('./csv-files/week1.csv');
        var results1 = products.salesData('./csv-files/week2.csv');
        var results2 = products.salesData('./csv-files/week3.csv');
        var results3 = products.salesData('./csv-files/week4.csv');


        assert.equal(105, results.length);
        assert.equal(118, results1.length);
        assert.equal(105, results2.length);
        assert.equal(120,results3.length);    
    });

    it('should return a map of products for week1', function(){
        var results = products.groupByQuantity(productList);
        var expectedMap = { 'Milk 1l': 39,
            Imasi: 30,
            Bread: 45,
            'Chakalaka Can': 23,
            'Gold Dish Vegetable Curry Can': 17,
            'Fanta 500ml': 33,
            'Coke 500ml': 54,
            'Cream Soda 500ml': 22,
            'Iwisa Pap 5kg': 17,
            'Top Class Soy Mince': 22,
            'Shampoo 1 litre': 3,
            'Soap Bar': 12,
            'Bananas - loose': 47,
            'Apples - loose': 36,
            'Mixed Sweets 5s': 49 
        }
        assert.deepEqual(expectedMap, results);  
    });

    it("should return a map of sales per week", function(){
        var results = products.salesPerWeek(productList);
        assert.deepEqual({ 'Milk 1l': 390,
            Imasi: 750,
            Bread: 540,
            'Chakalaka Can': 230,
            'Gold Dish Vegetable Curry Can': 153,
            'Fanta 500ml': 214.5,
            'Coke 500ml': 351,
            'Cream Soda 500ml': 165,
            'Iwisa Pap 5kg': 510,
            'Top Class Soy Mince': 264,
            'Shampoo 1 litre': 90,
            'Soap Bar': 72,
            'Bananas - loose': 94,
            'Apples - loose': 72,
            'Mixed Sweets 5s': 120 }, 
            results
        ); 
    });
});

describe("Find purchases", function(){
    it('should return purchases', function(){
        var results = purchases.purchasesData('./csv-files/purchases.csv');
        assert.equal(23,results["week1"].length);    
    });

    it('should return purchases per week', function(){
        var results = purchases.purchasesPerWeek(myPurchases, "week1");
        assert.deepEqual({ 'Shampoo 1 litre': 60,
            'Soap Bar': 39,
            'Bananas - loose': 20,
            'Apples - loose': 300,
            'Mixed Sweets 5s': 1170,
             Bread: 314,
             Imasi: 521,
            'Chakalaka Can': 105,
            'Coke 500ml': 126,
            'Cream Soda 500ml': 81,
            'Fanta 500ml': 108,
            'Gold Dish Vegetable Curry Can': 75,
            'Iwisa Pap 5kg': 100,
            'Milk 1l': 70,
            'Top Class Soy Mince': 80 }
            ,results
        );    
    });
});    
describe("Finds most most popular products", function(){
    it('should return most popular product for week1', function(){
        var results = products.mostPopularProd(productMap);

        assert.deepEqual({"desc":"Most popular product","product":"Coke 500ml","quantity":54}
        , results
    );  
});

describe("Finds least popular products", function(){
    it('should return least popular product for week1', function(){
        var results = products.leastPopularProd(productMap,54);

        assert.deepEqual({"desc":"Least popular product","product":"Shampoo 1 litre","quantity":3}
        , results);  
    });
});

describe("Finds most popular categories", function(){
    it('should return most popular category for week1', function(){
        var results = products.mostPopularCat(productMap);

        assert.deepEqual({"desc":"Most popular category","category":"Fizzy Drinks","quantity":109}
        , results);  
    });
});

describe("Finds least popular categories", function(){
    it('should return least popular category for week1', function(){
        var results = products.leastPopularCat(productMap,109);

        assert.deepEqual({"desc":"Least popular category","category":"Cosmetics","quantity":15}
        , results);  
    });
   
});
describe('Find profit', function(){
    it('should return profit map', function(){
        
        var results = purchases.profitMapping(weeklySales, weeklyPurchases);

        assert.deepEqual({ 'Milk 1l': 320,
            Imasi: 229,
            Bread: 226,
            'Chakalaka Can': 125,
            'Gold Dish Vegetable Curry Can': 78,
            'Fanta 500ml': 106.5,
            'Coke 500ml': 225,
            'Cream Soda 500ml': 84,
            'Iwisa Pap 5kg': 410,
            'Top Class Soy Mince': 184,
            'Shampoo 1 litre': 30,
            'Soap Bar': 33,
            'Bananas - loose': 74,
            'Apples - loose': -228,
            'Mixed Sweets 5s': -1050 },
            results
        );
    })
    it('should return the most prifitable product', function(){
      
      
      var results = purchases.mostProfitableProduct(profitMap);

      assert.deepEqual( {"desc":"Most Profitable Product","product":"Iwisa Pap 5kg","profitAmount":410}
        ,results)  
    })
    it('should return the most profititable category', function(){
      var results = purchases.catProfit(profitMap);

      assert.deepEqual({"desc":"Most Profitable Category","category":"Dairy Products","profitAmount":549}
        ,results)  
    })
});
var assert = require("assert");
var products = require("../products");
var purchases = require("../purchases");

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
        var productList = products.salesData('./csv-files/week1.csv');
        var results = products.groupByQuantity(productList);
        //console.log(results);
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
  'Mixed Sweets 5s': 49 }


        assert.deepEqual(expectedMap, results);  
    });
    it("should return a map of sales per week", function(){
        var productList = products.salesData('./csv-files/week1.csv');
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
        var myPurchases = purchases.purchasesData('./csv-files/purchases.csv');
        var results = purchases.purchasesPerWeek(myPurchases, "week1");
        ///console.log(results);
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

    // it('should return a map of purchases', function(){
    //     var purchasesList = purchases.purchasesData('./csv-files/purchases.csv');
    //     var results = purchases.groupPurchasesByQuantity(purchasesList);
    //     //console.log(results);
    //     var expectedMap = { 'Chakalaka Can': 94,
    //         'Coke 500ml': 171,
    //         'Cream Soda 500ml': 78,
    //         'Fanta 500ml': 95,
    //         'Gold Dish Vegetable Curry Can': 86,
    //         Imasi: 130,
    //         'Iwisa Pap 5kg': 50,
    //         'Milk 1l': 147,
    //         'Top Class Soy Mince': 98,
    //         'Bananas - loose': 72,
    //         'Apples - loose': 530,
    //         'Mixed Sweets 5s': 690,
    //         'Shampoo 1 litre': 26,
    //         'Soap Bar': 52,
    //         Bread: 140,
    //         'Rose (plastic)': 20,
    //         'Heart Chocolates': 20,
    //         'Valentine Cards': 20 
    //     }
    //     assert.deepEqual(expectedMap, results);  
    // });
});    
describe("Finds most most popular products", function(){
    it('should return most popular product for week1', function(){
        var productList = products.salesData('./csv-files/week1.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.mostPopularProd(productMap);

        assert.deepEqual({"product":"Coke 500ml","quantity":54}, results);  
    });
    it('should return most popular product for week2', function(){
        var productList = products.salesData('./csv-files/week2.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.mostPopularProd(productMap);

        assert.deepEqual({"product":"Mixed Sweets 5s","quantity":54}, results);  
    });
     it('should return most popular product for week3', function(){
        var productList = products.salesData('./csv-files/week3.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.mostPopularProd(productMap);

        assert.deepEqual( {"product":"Milk 1l","quantity":30}, results);  
    });
    it('should return most popular product for week4', function(){
        var productList = products.salesData('./csv-files/week4.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.mostPopularProd(productMap);

        assert.deepEqual({"product":"Milk 1l","quantity":45}, results);  
    });
});

describe("Finds least popular products", function(){
    it('should return least popular product for week1', function(){
        var productList = products.salesData('./csv-files/week1.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.leastPopularProd(productMap,54);

        assert.deepEqual({"product":"Shampoo 1 litre","quantity":3}, results);  
    });
    it('should return least popular product for week2', function(){
        var productList = products.salesData('./csv-files/week2.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.leastPopularProd(productMap,54);

        assert.deepEqual({"product":"Soap Bar","quantity":5}, results);  
    });
     it('should return least popular product for week3', function(){
        var productList = products.salesData('./csv-files/week3.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.leastPopularProd(productMap,30);

        assert.deepEqual({"product":"Iwisa Pap 5kg","quantity":4},results);  
    });
    it('should return least popular product for week4', function(){
        var productList = products.salesData('./csv-files/week4.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.leastPopularProd(productMap,45);

        assert.deepEqual({"product":"Shampoo 1 litre","quantity":13},results);  
    });
});

describe("Finds most popular categories", function(){
    it('should return most popular category for week1', function(){
        var productList = products.salesData('./csv-files/week1.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.mostPopularCat(productMap);

        assert.deepEqual({"category":"Fizzy Drinks","quantity":109}, results);  
    });
    it('should return most popular category for week2', function(){
        var productList = products.salesData('./csv-files/week2.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.mostPopularCat(productMap);

        assert.deepEqual({"category":"Fizzy Drinks","quantity":87}, results);  
    });
    it('should return most popular category for week3', function(){
        var productList = products.salesData('./csv-files/week3.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.mostPopularCat(productMap);

        assert.deepEqual({"category":"Dairy Products","quantity":55}, results);  
    });
    it('should return most popular category for week4', function(){
        var productList = products.salesData('./csv-files/week4.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.mostPopularCat(productMap);

        assert.deepEqual({"category":"Fizzy Drinks","quantity":88}, results);  
    });
});

describe("Finds least popular categories", function(){
    it('should return least popular category for week1', function(){
        var productList = products.salesData('./csv-files/week1.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.leastPopularCat(productMap,109);

        assert.deepEqual({"category":"Cosmetics","quantity":15}, results);  
    });
    it('should return least popular category for week2', function(){
        var productList = products.salesData('./csv-files/week2.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.leastPopularCat(productMap,87);

        assert.deepEqual({"category":"Bulk","quantity":10}, results);  
    });
    it('should return least popular category for week3', function(){
        var productList = products.salesData('./csv-files/week3.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.leastPopularCat(productMap,55);

        assert.deepEqual({"category":"Bulk","quantity":4}, results);  
    });
    it('should return least popular category for week4', function(){
        var productList = products.salesData('./csv-files/week4.csv');
        var productMap = products.groupByQuantity(productList);
        var results = products.leastPopularCat(productMap,88);

        assert.deepEqual({"category":"Bulk","quantity":16}, results);  
    });
});
describe('Find profit', function(){
    it('should return profit map', function(){
        var productList = products.salesData('./csv-files/week1.csv');
        var weeklySales = products.salesPerWeek(productList);
        var myPurchases = purchases.purchasesData('./csv-files/purchases.csv');
        var weeklyPurchases = purchases.purchasesPerWeek(myPurchases, "week1");
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
      var productList = products.salesData('./csv-files/week1.csv');
      var weeklySales = products.salesPerWeek(productList);
      var myPurchases = purchases.purchasesData('./csv-files/purchases.csv');
      var weeklyPurchases = purchases.purchasesPerWeek(myPurchases, "week1");
      var profitMap = purchases.profitMapping(weeklySales, weeklyPurchases);
      var results = purchases.mostProfitableProduct(profitMap);

      assert.deepEqual({productName:'Iwisa Pap 5kg',qty: 410},results)  
    })
     it('should return the most profititable category', function(){
      var productList = products.salesData('./csv-files/week1.csv');
      var weeklySales = products.salesPerWeek(productList);
      var myPurchases = purchases.purchasesData('./csv-files/purchases.csv');
      var weeklyPurchases = purchases.purchasesPerWeek(myPurchases, "week1");
      var profitMap = purchases.profitMapping(weeklySales, weeklyPurchases);
      var results = purchases.catProfit(profitMap);

      assert.deepEqual({ category: 'Dairy Products', profit: 549 }
        ,results)  
    })
});
var Food = require('./models/food') // יבא את מודל המאכל
var request = require('request'); // כדי שנוכל לבקש את המאכל
var MongoClient = require('mongodb').MongoClient; // כדי להתחבר למונגו
var url = "";

// פרמטרים
const params = {
  api_key: 'DEMO_KEY',             // מפתח api
  query: 'potato',                // שאילתא
  dataType: ['Survey (FNDDS)'],  // סוג (מסוג מאכל כללי ולא ממותג), ניתן להוסיף למערך סוגים שונים
  pagesize: 1,                  // מספר תוצאות
}

/* Searchs Options: https://fdc.nal.usda.gov/api-spec/fdc_api.html#/FDC/GetFoodSearch */
var api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(
  params.query)}&dataType${encodeURIComponent(params.dataType)}&pageSize${encodeURIComponent(params.pagesize)}`

  // JSON-הגדרת הבקשה של ה
  const options = {
    url: api_url,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8'
    }
  };
  
  // FDC-משיכת נתונים מ
  function getApiData(options) {
    return new Promise((resolve, reject) => {
      request(options, function (err, res, body) {
        if (err) { reject(err);}        // אם יש שגיאה תדפיס אותה
         else {
          let json = JSON.parse(body);  // JSON-אחרת קח את התוצאה ותמיר אותה ל
          // console.log(json.foods[0]);
          resolve(json.foods[0]);       // תחזיר את המערך של המאכלים
        }
      })
    })
  }
  
  async function GetApiData(options) {
    let apiData = await getApiData(options);
    // console.log("Api data:", apiData); 
    
    // צור מאכל חדש
    var food = Food.Food;
  
    // JSON-הכנס את הנתונים של מערך המאכלים שקיבלת ב
    food.FdcFoodID = apiData.fdcId;
    food.Description = apiData.description;
    food.LowerCaseDescription = apiData.lowercaseDescription;
    food.DataType = apiData.dataType;
    food.GtinUpc = apiData.gtinUpc;
    food.PublishedDate = apiData.publishedDate;
    food.BrandOwner = apiData.brandOwner;
    food.BrandName = apiData.brandName;
    food.Ingredients = apiData.ingredients;
    food.MarketCountry = apiData.marketCountry;
    food.FoodCategory = apiData.foodCategory;
    food.AllHighlightFields = apiData.allHighlightFields;
    food.Score = apiData.score;
  
      // הכנס את הנתונים של מערך המרכיבים
      apiData.foodNutrients.map(elem => {
        food.FoodNutrients.push({
          nutrientId: elem.nutrientId,
          nutrientName: elem.nutrientName,
          nutrientNumber: elem.nutrientNumber,
          unitName: elem.unitName,
          derivationCode: elem.derivationCode,
          derivationDescription: elem.derivationDescription,
          value: elem.value
        });
      })
  
    // התחברות לבסיס הנתונים
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;                                             // אם יש שגיאה תדפיס אותה
      var dbo = db.db('Dayet');                                       // Dayet אחרת גש לקולקשיין 
      dbo.collection("Foods").insertOne(food, function (err, res) {   // ותכניס את המאכל שיצרנו Foods גש לבסיס נתונים בשם 
        if (err) throw err;                                           // אם יש שגיאה תדפיס אותה
        console.log("1 food inserted successfully");                  // אחרת תדפיס הודעת הצלחה
      });
  
      // הדפסה של כל המאכלים ממונגו
      dbo.collection("Foods").find({}).toArray(function (err, result) {  // Foods-מצא את כל המאכלים בבסים הנתונים
        if (err) throw err;                                              // אם יש שגיאה תדפיס אותה
        console.log("Data from mongoose is: ",result);                // הדפס את כל המאכלים מבסיס הנתונים
        // Object.values(result).forEach(val => console.log(val));
        db.close();  // סגור את החיבור
      });
    });
  }
  GetApiData(options);
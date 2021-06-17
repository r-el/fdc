var Food = require('./models/food') // יבא את מודל המאכל
var fetch = require('node-fetch')
var request = require('request'); // כדי שנוכל לבקש את המאכל
var MongoClient = require('mongodb').MongoClient; // להתחבר למונגו
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

function getData() {
  return fetch(api_url)
  .then((Response) => Response.json())
}

// אפשר גם להדפיס את רק את המערך של המרכיבים
getData().then((data) => console.log(data.foods[0]/*.foodNutrients*/))
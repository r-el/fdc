var Food = require('./models/food') // יבא את מודל המאכל
const fetch = require('node-fetch')

// פרמטרים
const params = {
  // מפתח api
  api_key: 'DEMO_KEY', // You can get a api Key at https://fdc.nal.usda.gov/api-key-signup.html

  // שאילתא
  query: 'banana',

  // סוג (מסוג מאכל כללי ולא ממותג), ניתן להוסיף למערך סוגים שונים
  dataType: ['Survey (FNDDS)'], 

  // מספר תוצאות
  pagesize: 1,
}

/* searchs option  https://fdc.nal.usda.gov/api-spec/fdc_api.html#/FDC/GetFoodSearch */
const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(
  params.api_key
)}&query=${encodeURIComponent(params.query)}&dataType${encodeURIComponent(
  params.dataType
)}&pageSize${encodeURIComponent(params.pagesize)}`

function getData() {
  return fetch(api_url)
  .then((Response) => Response.json())
}

// אפשר גם להדפיס את רק את המערך של המרכיבים
getData().then((data) => console.log(data.foods[0]/*.foodNutrients*/))
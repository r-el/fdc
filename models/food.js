// מודל מאכל

var Food = {
    FdcFoodID: 0,                 // מזהה מאכל
    Description: "",              // שם מאכל באותיות גדולות
    LowerCaseDescription: "",     // שם מאכל באותיות קטנות
    DataType: "",                 // סוג מאכל
    GtinUpc: "",                  // gtinUpc
    PublishedDate: "",            // תאריך פרסום
    BrandOwner: "",               // בעל מותג
    BrandName: "",                // שם מותג
    Ingredients: "",              // רכיבים
    MarketCountry: "",            // איזור חנות
    FoodCategory: "",             // קטגוריית מאכל
    AllHighlightFields: "",       // All Highlight Fields
    Score: 0,                     // score
    FoodNutrients: [              // רשימת רכיבים
        {
            nutrientId: 0,               // מזהה מרכיב
            nutrientName: "",            // שם מרכיב
            nutrientNumber: "",          // מספר מרכיב
            unitName: "",                // יחידה
            derivationCode: "",
            derivationDescription: "",
            value: 0                     // ערך
        }
    ]
}
// יצוא של המודל
module.exports.Food = Food
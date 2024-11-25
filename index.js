let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app =  express();
let PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './DB/database.sqlite',
    driver: sqlite3.Database,
  });
})();

// E1 : get all restaurants

async function fetchAllRestaurant() {
  let query = `SELECT * from Restaurants `;
  let response = await db.all(query, []);
  // console.log('Query Result:', response);
  return { restaurants: response };
}

app.get('/restaurants', async (req, res) => {
  try {
    let result = await fetchAllRestaurant();
    if (result.restaurants.length === 0) {
      res.status(404).json({ message: `Not Found` });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E2 get restaurant by Id
async function fetchById(id) {
  let query = `SELECT * from Restaurants where id=?`;
  let response = await db.all(query, [id]);
  return { restaurants: response };
}
app.get('/restaurants/details/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let response = await fetchById(id);

    if (response.restaurants.length === 0) {
      res.status(404).json({ message: `Not Found` });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E3 : fetch by cuisine

async function fetchByCuisine(cuisine) {
  let query = `SELECT * from Restaurants where cuisine=?`;
  let response = await db.all(query, [cuisine]);
  console.log(response);
  return { restaurants: response };
}
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    let cuisine = req.params.cuisine;
    let response = await fetchByCuisine(cuisine);

    if (response.restaurants.length === 0) {
      res.status(404).json({ message: `Not Found ` });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//E4 get res by filter
// /restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false

async function fetchRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query = `
    SELECT * 
    FROM restaurants 
    WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?
  `;

  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

app.get('/restaurants/filter', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let hasOutdoorSeating = req.query.hasOutdoorSeating;
    let isLuxury = req.query.isLuxury;

    let response = await fetchRestaurantsByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//E5 : restaurant sorted by rating

// /restaurants/sort-by-rating

async function sortByRating() {
  let query = `SELECT * from Restaurants ORDER BY rating DESC `;
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let response = await sortByRating();

    if (response.restaurants.length === 0) {
      res.status(404).json({ message: `Not Found ` });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//E6
// /dishes

async function fetchAllDishes() {
  try {
    let query = `SELECT * from dishes`;
    let response = await db.all(query, []);
    return { dishes: response };
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
app.get('/dishes', async (req, res) => {
  let response = await fetchAllDishes();
  return res.json(response);
});

//E7: fetch a dish by id
// /dishes/details/

async function fetchDishById(id) {
  let query = `SELECT * from dishes where id=?`;
  let response = await db.all(query, [id]);

  return { dish: response };
}
app.get('/dishes/details/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let response = await fetchDishById(id);
    res.send({ response });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// E8: fetch on the basis of veg/non-veg
// /dishes/filter?isVeg=true

async function fetchDishesByFilter(isVeg) {
  let query = `SELECT * FROM dishes WHERE isVeg = ?`;

  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get('/dishes/filter', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;

    let response = await fetchDishesByFilter(isVeg);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// E9 : sort by price
// /dishes/sort-by-price

async function sortByPrice() {
  let query = `SELECT * from dishes ORDER BY price`;
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let response = await sortByPrice();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

# FoodieFinds Backend

## Overview

FoodieFinds is a backend system for a food discovery app that helps users search for restaurants and dishes based on various filters and sorting options. This project is built using **Node.js**, **Express**, and **SQLite** with raw SQL queries to handle data retrieval efficiently.

---

## Features

1. **Restaurant Discovery**
   - Fetch all restaurants.
   - Get details of specific restaurants by ID.
   - Search restaurants by cuisine.
   - Filter restaurants by veg/non-veg, outdoor seating, and luxury options.
   - Sort restaurants by ratings (highest to lowest).

2. **Dish Discovery**
   - Fetch all dishes.
   - Get details of specific dishes by ID.
   - Filter dishes by veg/non-veg options.
   - Sort dishes by price (lowest to highest).

3. **Database Management**
   - Efficient database seeding for initialization.
   - Raw SQL queries for optimized data handling.

---

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd FoodieFinds
2. Install the dependencies
```
npm install
```
3. Initialize the database
- Update the initDB.js file's database path to match your project folder.
- Run the seeder script:
```
node <folder_name>/initDB.js
```
4. Start the server
```
npm start
```


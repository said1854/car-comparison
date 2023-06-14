import * as SQLite from "expo-sqlite";

// Connect to the SQLite database
const db = SQLite.openDatabase("your-database-name.db");

// Create a table if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS car_table (car_id INTEGER PRIMARY KEY, title VARCHAR(25), year INT(4), km VARCHAR(15), color VARCHAR(15), price VARCHAR(25), url VARCHAR(50))"
  );
});

// Convert JSON to string
const jsonData = { key: "value" };
const jsonString = JSON.stringify(jsonData);

// Insert the JSON data into the database
db.transaction((tx) => {
  tx.executeSql(
    "INSERT INTO your_table_name (json_data) VALUES (?)",
    [jsonString],
    (_, resultSet) => {
      // Success callback
      console.log("JSON data inserted successfully");
    },
    (_, error) => {
      // Error callback
      console.error("Error inserting JSON data:", error);
    }
  );
});

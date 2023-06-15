import DatabaseConnection from "./databaseConnection";

const db = DatabaseConnection.getConnection();

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS car_table (car_id INTEGER PRIMARY KEY, title VARCHAR(25), year INT(4), km VARCHAR(15), color VARCHAR(15), price VARCHAR(25), url VARCHAR(50))"
  );
});

const insertObjects = (objects) => {
  db.transaction((tx) => {
    for (const object of objects) {
      tx.executeSql(
        "INSERT INTO car_table (id, title, price, year, km, color, url) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          object.id,
          object.title,
          object.price,
          object.year,
          object.km,
          object.color,
          object.url,
        ],
        (_, error) => {
          console.error("Error inserting object:", error);
        }
      );
    }
    console.log("Objects inserted successfully.");
  });
};

export default insertObjects;

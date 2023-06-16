import DatabaseConnection from "./databaseConnection";

const db = DatabaseConnection.getConnection();

const insertObjects = (array) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS car_table (carId INTEGER PRIMARY KEY, title VARCHAR(25), year INT(4), km VARCHAR(15), color VARCHAR(15), price VARCHAR(25), url VARCHAR(50));",
      [],
      () => {
        array.forEach((car) => {
          tx.executeSql(
            "SELECT * FROM car_table WHERE carId = ?;",
            [car.carId],
            (_, result) => {
              const existingRow = result.rows.length > 0;

              if (existingRow) {
                // Handle the case when a row with the same carId already exists
                console.log("A row with carId already exists.");
              } else {
                // Insert a new row with a unique carId
                tx.executeSql(
                  "INSERT INTO car_table (carId, title, year, km, color, price, url) VALUES (?, ?, ?, ?, ?, ?, ?);",
                  [
                    car.id,
                    car.title,
                    car.year,
                    car.km,
                    car.color,
                    car.price,
                    car.url,
                  ],
                  () => {
                    console.log("Row inserted successfully.");
                  },
                  (_, error) => {
                    console.log("Error inserting row:", error);
                  }
                );
              }
            },
            (_, error) => {
              console.log("Error fetching existing row:", error);
            }
          );
        });
      },
      (_, error) => {
        console.log("Error creating table:", error);
      }
    );
  });
};

export default insertObjects;

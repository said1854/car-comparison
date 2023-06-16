import * as SQLite from "expo-sqlite";

const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database12348.db"),
};

export default DatabaseConnection;

import * as SQLite from "expo-sqlite";

const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database1fds3.db"),
};

export default DatabaseConnection;

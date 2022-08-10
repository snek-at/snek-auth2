import { Connection, DuckDB } from "node-duckdb"

export async function queryDatabaseWithIterator() {
  // create new database in memory
  const db = new DuckDB()
  // create a new connection to the database
  const connection = new Connection(db)

  // perform some queries
  await connection.executeIterator("CREATE TABLE 'user' AS SELECT * FROM 'user.parquet';")
  
  const result = await connection.executeIterator("SELECT * FROM 'user';")

  // fetch and print result
  console.log(result.fetchAllRows())

  // release resources
  connection.close()
  db.close()
}
// sql = `copy (select * from '${input}') to  '${output}'(FORMAT PARQUET)`;

// db.all(sql, (err,d) => console.log(err ? 'Error: '+err.message : d));
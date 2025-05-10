
//create db config
import mysql from 'mysql2'
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'test' // make sure this DB exists
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL');
    return;
  };
  console.log('Connected to MySQL');
});

export default db;

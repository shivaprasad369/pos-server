
//create db config
import mysql from 'mysql2'
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12778315',
  password: 'yu3VhcPhiE', // your MySQL password
  database: 'sql12778315' // make sure this DB exists
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL');
    return;
  };
  console.log('Connected to MySQL');
});

export default db;

import { Strategy as LocalStrategy } from 'passport-local';
import db from './db/db.js';
import bcrypt from 'bcryptjs';

function initialize(passport) {
  passport.use(new LocalStrategy((username, password, done) => {
    db.execute('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) return done(err);
      if (results.length === 0) return done(null, false, { message: 'No user found' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user);
      else return done(null, false, { message: 'Incorrect password' });
    });
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) return done(err);
      done(null, results[0]);
    });
  });
}

export default initialize;

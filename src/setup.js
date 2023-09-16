import 'dotenv/config';
import { sequelize } from './utils/db.js';
import './models/User.js';
import './models/Token.js';
import './models/Test.js';

sequelize.sync({ force: true });

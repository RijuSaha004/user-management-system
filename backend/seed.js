const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  await User.deleteMany({});

  await User.create([
    {
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      status: 'active',
    },
    {
      name: 'Manager One',
      email: 'manager@example.com',
      password: 'manager123',
      role: 'manager',
      status: 'active',
    },
    {
      name: 'Regular User',
      email: 'user@example.com',
      password: 'user1234',
      role: 'user',
      status: 'active',
    },
  ]);

  console.log('✅ Seeded successfully!');
  process.exit();
};

seed();
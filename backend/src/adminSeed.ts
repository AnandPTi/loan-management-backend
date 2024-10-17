import User from './models/User';
import mongoose from 'mongoose';

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URL!);

  const adminExists = await User.findOne({ email: 'anandp@gmail.com' });
  if (!adminExists) {
    const adminUser = new User({
      email: 'anandp@gmail.com',
      name: 'Anand Prakash',
      phone: '1234567890',
      address: 'Raipur',
      password: 'anandP12@',
      role: 'admin',
    });
    await adminUser.save();
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  await mongoose.disconnect();
};

seedAdmin();

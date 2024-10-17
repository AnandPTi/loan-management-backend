import User from './models/User';

const seedAdmin = async () => {
  const admin = new User({
    email: 'anandp@gmail.com',
    password: 'anandP12@',
    role: 'admin',
  });

  await admin.save();
};

export default seedAdmin;

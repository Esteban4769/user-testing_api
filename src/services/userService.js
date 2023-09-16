import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { emailService } from '../services/emailService.js';
import { ApiError } from '../exceptions/ApiError.js';
import { User } from '../models/User.js';

function getAllActive() {
  return User.findAll({
    where: { activationToken: null },
    order: ['id'],
  });
}

function getByEmail(email) {
  return User.findOne({
    where: { email },
  });
}

function normalize({ id, email }) {
  return { id, email };
}

async function register({ email, password }) {
  const existingUser = await getByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('Validation error', {
      email: 'Email is already taken',
    });
  }

  const activationToken = uuidv4();
  const hash = await bcrypt.hash(password, 10);
  
  await User.create({
    email,
    password: hash,
    activationToken,
  });

  await emailService.sendActivationLink(email, activationToken);
}

const assignTestToUser = async (userId, testId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.assignedTests.some((test) => test.id === testId)) {
    user.assignedTests.push({ id: testId, completed: false });
    await user.save();
  }
};

const markTestAsCompleted = async (testId, userId, testResult) => {
  const test = await Test.findByPk(testId);
  if (!test) {
    throw new Error('Test not found');
  }

  const completedByUser = test.completedByUsers.find((entry) => entry.userId === userId);

  if (!completedByUser) {
    test.completedByUsers.push({ userId, result: testResult });
    await test.save();
  }
};

const getCompletedTests = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const completedTests = await Test.findAll({
    where: {
      'completedByUsers.userId': userId,
    },
  });

  return completedTests;
};

const getAvailableTests = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const availableTests = user.assignedTests.filter((test) => !test.completed);

  return availableTests;
};

export const userService = {
  getAllActive,
  normalize,
  getByEmail, 
  register,
  markTestAsCompleted,
  assignTestToUser,
  getCompletedTests,
  getAvailableTests,
};
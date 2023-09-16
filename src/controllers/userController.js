import { userService } from '../services/userService.js';

async function getAll(req, res, next) {
  const users = await userService.getAllActive();

  res.send(
    users.map(userService.normalize)
  );
}

async function getAvailableTests(req, res, next) {
  const userId = req.user.id; 
  try {
    const availableTests = await userService.getAvailableTests(userId);
    res.send(availableTests);
  } catch (error) {
    next(error);
  }
}

async function getCompletedTests(req, res, next) {
  const userId = req.user.id; 
  try {
    const completedTests = await userService.getCompletedTests(userId);
    res.send(completedTests);
  } catch (error) {
    next(error);
  }
}

export const userController = { 
  getAll,
  getAvailableTests,
  getCompletedTests,
};

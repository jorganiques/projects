const mongoose = require('mongoose');
const request = require('supertest'); 
const app = require('../src/index'); 
const User = require('../src/models/User'); 
const SavingsJar = require('../src/models/SavingsJar'); 
describe('Auth API', () => {
  const newUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
  };

  let userId;
  let jarId; 

  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Clear users and jars collection before each test
  beforeEach(async () => {
    await User.deleteMany({});
    await SavingsJar.deleteMany({});
  });

  afterAll(async () => {
    // Close DB connection after tests
    await mongoose.connection.close();
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body).toHaveProperty('userId');

    // Store userId for future tests
    userId = response.body.userId;
  });

  it('should login the registered user successfully using username', async () => {
    // First, register the user
    await request(app)
      .post('/api/auth/register')
      .send(newUser);

    // Now, attempt to log in using the same username and password
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: newUser.username, // Using username instead of email
        password: newUser.password,
      });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.message).toBe('Login successful');

    // Store userId from login response if needed
    userId = loginResponse.body.userId;
  });

  it('should not login with an incorrect password', async () => {
    // First, register the user
    await request(app)
      .post('/api/auth/register')
      .send(newUser);

    // Attempt to log in with a wrong password
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: newUser.username, 
        password: 'WrongPassword!',
      });

    expect(loginResponse.statusCode).toBe(400);
    expect(loginResponse.body.message).toBe('Invalid credentials');
  });

  it('should not login a non-registered user', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'nonexistentuser',
        password: 'Password123!',
      });

    expect(loginResponse.statusCode).toBe(400);
    expect(loginResponse.body.message).toBe('User not found');
  });

  it('should create a new jar for the registered user', async () => {
    // Ensure the user is registered first
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    userId = registerResponse.body.userId; 

    const newJar = {
      jarName: 'Test Jar',
      targetAmount: 100,
      userId, 
      notes: 'This is a test jar',
    };

    const response = await request(app)
      .post('/api/jars') 
      .send(newJar);

    console.log('Jar creation response:', response.body); 

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Savings jar created successfully');
    expect(response.body).toHaveProperty('jar');
    expect(response.body.jar).toHaveProperty('jarId');
    expect(response.body.jar.userId).toBe(userId); 

    
    // Store jarId for future tests
    jarId = response.body.jar.jarId; 

    expect(jarId).toBeDefined(); 
    console.log('User ID:', userId);
    console.log('Jar ID:', jarId);
  });

  
  it('should edit the notes and target amount of the created jar', async () => {
    const updatedJarDetails = { 
      notes: 'Updated notes for the test jar', 
      targetAmount: 150 
    };
    
    // Log existing jar before update attempt
    const existingJar = await SavingsJar.findOne({ userId, jarId, isDeleted: false });
    console.log('Existing Jar:', existingJar);
    
    if (!existingJar) {
      // Create the jar again if it doesn't exist for some reason
      const newJar = {
        jarName: 'Test Jar',
        targetAmount: 100,
        userId, 
        notes: 'This is a test jar',
      };
      const createResponse = await request(app)
        .post('/api/jars') 
        .send(newJar);
      jarId = createResponse.body.jar.jarId; 
    }
  
    const editResponse = await request(app)
      .put(`/api/jars/${userId}/${jarId}`)
      .send(updatedJarDetails);
  
    expect(editResponse.statusCode).toBe(200);
    expect(editResponse.body.message).toBe('Jar updated successfully');
    expect(editResponse.body.jar).toHaveProperty('jarId', jarId);
    expect(editResponse.body.jar.notes).toBe(updatedJarDetails.notes); 
  });
 
  // Additional test cases...

});

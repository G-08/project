import request from 'supertest';
import { createServer } from 'http';
import Home from '@/app';
const mongoose = require('mongoose');

let server;

beforeAll(async () => {
  jest.setTimeout(8000);
  app.locals.db = await mongoose.connect(process.env.MONGO_URL); 
  server = createServer((req, res) => {
    Home.prepare().then(() => {
      Home.getRequestHandler()(req, res);
    });
  });
});

afterAll((done) => {
  server.close(done);
  mongoose.connection.close(true); 
});

describe('POST /api/register', () => {
  it('should register a user successfully', async () => {
    const res = await request(server)
      .post('/api/register')
      .send({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'Password1',
        date_of_birth: '01/01/2000',
        user_height: 180,
        user_weight: 75,
        thighs: 50,
        shoulders: 90,
        waist: 30,
        biceps: 35,
        initial: 1,
        goal: 2
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('utente creato correttamente');
  });

  it('should fail with invalid email', async () => {
    const res = await request(server)
      .post('/api/register')
      .send({
        email: 'invalid-email',
        firstName: 'John',
        lastName: 'Doe',
        password: 'Password1',
        date_of_birth: '01/01/2000',
        user_height: 180,
        user_weight: 75,
        thighs: 50,
        shoulders: 90,
        waist: 30,
        biceps: 35,
        initial: 1,
        goal: 2
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('email inserita non corretta');
  });

  it('should fail with password not containing uppercase', async () => {
    const res = await request(server)
      .post('/api/register')
      .send({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password1',
        date_of_birth: '01/01/2000',
        user_height: 180,
        user_weight: 75,
        thighs: 50,
        shoulders: 90,
        waist: 30,
        biceps: 35,
        initial: 1,
        goal: 2
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('password must contain uppercase characters');
  });

  it('should fail with invalid date of birth', async () => {
    const res = await request(server)
      .post('/api/register')
      .send({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'Password1',
        date_of_birth: '32/01/2000',
        user_height: 180,
        user_weight: 75,
        thighs: 50,
        shoulders: 90,
        waist: 30,
        biceps: 35,
        initial: 1,
        goal: 2
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Date of birth is bad formed');
  });

  it('should fail with account already existing', async () => {
    const res = await request(server)
      .post('/api/register')
      .send({
        email: 'testing@test.ts',
        firstName: 'John',
        lastName: 'Doe',
        password: 'Password1',
        date_of_birth: '32/01/2000',
        user_height: 180,
        user_weight: 75,
        thighs: 50,
        shoulders: 90,
        waist: 30,
        biceps: 35,
        initial: 1,
        goal: 2
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Utente già registrato con questa email');
  });

});

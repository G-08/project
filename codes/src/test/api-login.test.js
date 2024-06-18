import request from 'supertest';
import { createServer } from 'http';
import app from '@/app';
import Utente from '@/models/Utente';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

let server;

beforeAll(async() => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGO_URL);
    server = createServer((req, res) => {
        app.prepare().then(() => {
        app.getRequestHandler()(req, res);
        });
    });
});

afterAll((done) => {
  server.close(done);
  mongoose.connection.close(true); 
});

describe('POST /api/auth/login', () => {
  let user;

  beforeEach(async () => {
    // Crea un utente da usare per il testing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123', salt);
    user = new Utente({
      email: 'test@example.com',
      password: hashedPassword,
    });
    await user.save();
  });

  afterEach(async () => {
    // Elimina l'utente fittizio
    await Utente.deleteMany({});
  });

  it('should login the user successfully and set a token cookie', async () => {
    jwt.sign.mockReturnValue('fake-jwt-token');

    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Accesso corretto');
    expect(res.headers['set-cookie']).toBeDefined();
    expect(res.headers['set-cookie'][0]).toMatch(/token=fake-jwt-token/);
  });

  it('should return an error if user is not found', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'Password123',
      });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should return an error if password is incorrect', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Password is incorrect');
  });

  it('should return an error if there is an internal server error', async () => {
    // Simula un errore del server
    jest.spyOn(Utente, 'findOne').mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });
});

import request from 'supertest';
import { createServer } from 'http';
import app from '@/app';
import Utente from '@/models/Utente';
import { validateJWT } from '@/helpers/validateJWT';

jest.mock('@/helpers/validateJWT');

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

describe('GET /api/auth/getUserData', () => {
  let user;

  beforeEach(async () => {
    // Crea un utente fittizio
    user = new Utente({
      email: 'test@example.com',
      password: 'Password123',
      firstName: 'Test',
      lastName: 'User',
    });
    await user.save();

    // Mock del JWT
    validateJWT.mockImplementation(() => user._id);
  });

  afterEach(async () => {
    // Elimina l'utente fittizio
    await Utente.deleteMany({});
  });

  it('should get user data successfully', async () => {
    const res = await request(server)
      .get('/api/auth/getUserData')
      .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('test@example.com');
    expect(res.body.data.firstName).toBe('Test');
    expect(res.body.data.lastName).toBe('User');
    expect(res.body.data.password).toBeUndefined();
  });

  it('should return an error if token is invalid', async () => {
    validateJWT.mockImplementation(() => null);

    const res = await request(server)
      .get('/api/auth/getUserData')
      .set('Authorization', 'Bearer invalid-token');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid or missing token');
  });

  it('should return an error if there is an internal server error', async () => {
    // Simula un errore del server
    jest.spyOn(Utente, 'findById').mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const res = await request(server)
      .get('/api/auth/getUserData')
      .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });
});

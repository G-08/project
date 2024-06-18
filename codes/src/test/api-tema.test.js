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

describe('PUT /api/auth/updateUserTheme', () => {
  let user;

  beforeEach(async () => {
    // Crea un utente fittizio
    user = new Utente({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      theme: 'light', // Aggiungi il campo tema
    });
    await user.save();

    // Mock del JWT
    validateJWT.mockImplementation(() => user._id);
  });

  afterEach(async () => {
    // Elimina i dati fittizi
    await Utente.deleteMany({});
  });

  it('should update user theme successfully', async () => {
    const newTheme = { theme: 'dark' };
    const res = await request(server)
      .put('/api/auth/updateUserTheme')
      .set('Authorization', 'Bearer valid-token')
      .send(newTheme);

    expect(res.status).toBe(200);
    expect(res.body.data.theme).toBe('dark');
  });

  it('should return an error if token is invalid', async () => {
    validateJWT.mockImplementation(() => null);

    const res = await request(server)
      .put('/api/auth/updateUserTheme')
      .set('Authorization', 'Bearer invalid-token')
      .send({ theme: 'dark' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid or missing token');
  });

  it('should return an error if user is not found', async () => {
    await Utente.deleteMany({}); // Elimina tutti gli utenti

    const res = await request(server)
      .put('/api/auth/updateUserTheme')
      .set('Authorization', 'Bearer valid-token')
      .send({ theme: 'dark' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  it('should return an error if there is an internal server error', async () => {
    // Simula un errore del server
    jest.spyOn(Utente, 'findByIdAndUpdate').mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const res = await request(server)
      .put('/api/auth/updateUserTheme')
      .set('Authorization', 'Bearer valid-token')
      .send({ theme: 'dark' });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });
});

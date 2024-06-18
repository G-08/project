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

describe('DELETE /api/auth/deleteAccount', () => {
  let user;

  beforeEach(async () => {
    // Crea un utente da usare per testare
    user = new Utente({
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();

    // Mock del JWT
    validateJWT.mockImplementation(() => user._id);
  });

  afterEach(async () => {
    // Elimina l'utente fittizio
    await Utente.deleteMany({});
  });

  it('should delete the user successfully', async () => {
    const res = await request(server)
      .delete('/api/auth/deleteAccount')
      .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User deleted successfully');

    const deletedUser = await Utente.findById(user._id);
    expect(deletedUser).toBeNull();
  });

  it('should return an error if token is invalid', async () => {
    validateJWT.mockImplementation(() => null);

    const res = await request(server)
      .delete('/api/auth/deleteAccount')
      .set('Authorization', 'Bearer invalid-token');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid or missing token');
  });

  it('should return an error if user is not found', async () => {
    await Utente.findByIdAndDelete(user._id);
    
    const res = await request(server)
    .delete('/api/auth/deleteAccount')
    .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
});
});

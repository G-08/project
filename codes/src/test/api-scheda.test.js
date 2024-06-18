import request from 'supertest';
import { createServer } from 'http';
import app from '@/app';
import Utente from '@/models/Utente';
import Scheda from '@/models/Scheda';
import CustomExercise from '@/models/EserciziPersonal';
import { validateJWT } from '@/helpers/validateJWT';

jest.mock('@/helpers/validateJWT');

let server;

beforeAll(async () => {
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

describe('GET /api/auth/getScheda', () => {
  let user;
  let scheda;

  beforeEach(async () => {
    // Crea un utente fittizio
    user = new Utente({
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();

    // Crea una scheda fittizia
    const customExercise = new CustomExercise({
      name: 'Push Up',
      description: 'A basic push up exercise',
    });
    await customExercise.save();

    scheda = new Scheda({
      userEmail: 'test@example.com',
      gambe: [{ exercises: [customExercise._id] }],
      schiena: [{ exercises: [customExercise._id] }],
      petto: [{ exercises: [customExercise._id] }],
      braccia: [{ exercises: [customExercise._id] }],
      addome: [{ exercises: [customExercise._id] }],
    });
    await scheda.save();

    // Mock del JWT
    validateJWT.mockImplementation(() => user._id);
  });

  afterEach(async () => {
    // Elimina i dati fittizi
    await Utente.deleteMany({});
    await Scheda.deleteMany({});
    await CustomExercise.deleteMany({});
  });

  it('should get scheda data successfully', async () => {
    const res = await request(server)
      .get('/api/auth/getScheda')
      .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(200);
    expect(res.body.data.userEmail).toBe('test@example.com');
    expect(res.body.data.gambe).toBeDefined();
    expect(res.body.data.schiena).toBeDefined();
    expect(res.body.data.petto).toBeDefined();
    expect(res.body.data.braccia).toBeDefined();
    expect(res.body.data.addome).toBeDefined();
  });

  it('should return an error if token is invalid', async () => {
    validateJWT.mockImplementation(() => null);

    const res = await request(server)
      .get('/api/auth/getScheda')
      .set('Authorization', 'Bearer invalid-token');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid or missing token');
  });

  it('should return an error if user is not found', async () => {
    await Utente.deleteMany({}); // Elimina tutti gli utenti

    const res = await request(server)
      .get('/api/auth/getScheda')
      .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Utente non trovato');
  });

  it('should return an error if scheda is not found', async () => {
    await Scheda.deleteMany({}); // Elimina tutte le schede

    const res = await request(server)
      .get('/api/auth/getScheda')
      .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Scheda non trovata');
  });

  it('should return an error if there is an internal server error', async () => {
    // Simula un errore del server
    jest.spyOn(Scheda, 'findOne').mockImplementation(() => {
      throw new Error('Internal server error');
    });

    const res = await request(server)
      .get('/api/auth/getScheda')
      .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });
});

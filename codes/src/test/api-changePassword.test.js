import request from 'supertest';
import { createServer } from 'http';
import app from '@/app';
import Utente from '@/models/Utente';
import bcrypt from 'bcryptjs';
import { validateJWT } from '@/helpers/validateJWT';

jest.mock('@/helpers/validateJWT');

let server;

beforeAll( async() => {
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

describe('PUT /api/auth/changePassword', () => {
    let user;

    beforeEach(async () => {
        // Crea un utente da usare per testare
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('oldPassword', salt);
        user = new Utente({
        email: 'test@example.com',
        password: hashedPassword,
        });
        await user.save();

        // Mock del JWT
        validateJWT.mockImplementation(() => user._id);
    });

    afterEach(async () => {
        // Elimina l'utente fittizio
        await Utente.deleteMany({});
    });

    it('should change the password successfully', async () => {
        const res = await request(server)
        .put('/api/auth/changePassword')
        .send({
            oldPassword: 'oldPassword',
            newPassword: 'newPassword1',
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Password cambiata correttamente');

        const updatedUser = await Utente.findById(user._id);
        const isMatch = await bcrypt.compare('newPassword1', updatedUser.password);
        expect(isMatch).toBe(true);
    });

    it('should return an error if old password is incorrect', async () => {
        const res = await request(server)
        .put('/api/auth/changePassword')
        .send({
            oldPassword: 'wrongOldPassword',
            newPassword: 'newPassword1',
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('password vecchia non corretta');
    });

    it('should return an error if new password is not provided', async () => {
        const res = await request(server)
        .put('/api/auth/changePassword')
        .send({
            oldPassword: 'oldPassword',
        });

        expect(res.status).toBe(400);
    });

    it('should return an error if token is invalid', async () => {
        validateJWT.mockImplementation(() => null);

        const res = await request(server)
        .put('/api/auth/changePassword')
        .send({
            oldPassword: 'oldPassword',
            newPassword: 'newPassword1',
        });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Token scaduto o non presente');
    });
});

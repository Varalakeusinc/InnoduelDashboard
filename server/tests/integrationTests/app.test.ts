import request from 'supertest';
import app from '../../app';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/db';

jest.mock('../../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

const companyId = 3;
const validArenaId = 70;
const invalidArenaId = 6;
const adminToken = generateToken(1, true, companyId);
const nonAdminToken = generateToken(2, false, companyId);
const userTypes = [
  ['admin', adminToken],
  ['non-admin', nonAdminToken]
];

function generateToken(userId: number, isAdmin = false, companyId?: number) {
  const payload = { userId, isAdmin, companyId };
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}

describe('Integration Tests for the Root Endpoint', () => {
  describe('GET /', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(app).get('/');
    });

    it('should return content-type as JSON or HTML', () => {
      expect(response.header['content-type']).toMatch(/(html|json)/);
    });
  });
});

describe('Get Arenas: /:companyId/arenas', () => {
  userTypes.forEach(([userType, token]) => {
    test(`should return a list of arenas for ${userType} user`, async () => {
      const res = await request(app)
        .get(`/api/arenas/${companyId}/arenas`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      res.body.forEach((arena: any) => {
        expect(arena).toHaveProperty('id');
        expect(arena).toHaveProperty('name');
        expect(arena).toHaveProperty('info_text');
        expect(arena).toHaveProperty('total_ideas');
        expect(arena).toHaveProperty('total_votes');
        expect(arena).toHaveProperty('overall_win_rate');
        expect(Array.isArray(arena.ideas)).toBe(true);

        arena.ideas.forEach((idea: any) => {
          expect(idea).toHaveProperty('id');
          expect(idea).toHaveProperty('idea_text');
          expect(idea).toHaveProperty('vote_count');
          expect(idea).toHaveProperty('win_rate');
        });
      });
    });

    test(`should return 404 when no arenas are found for ${userType} user`, async () => {
      jest.spyOn(prisma.arena, 'findMany').mockResolvedValueOnce([]);

      const res = await request(app)
        .get(`/api/arenas/${companyId}/arenas`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No arenas found');
    });

    test(`should return 500 when there is an internal server error for ${userType} user`, async () => {
      jest.spyOn(prisma.arena, 'findMany').mockImplementationOnce(() => {
        throw new Error('Database connection failed');
      });
      const res = await request(app)
        .get(`/api/arenas/${companyId}/arenas`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Something went wrong');
    });
  });
});

describe('Get Arena By ID: /:companyId/:id', () => {
  userTypes.forEach(([userType, token]) => {
    test(`should return selected arena for ${userType} user`, async () => {
      const res = await request(app)
        .get(`/api/arenas/${companyId}/${validArenaId}`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('info_text');
      expect(res.body).toHaveProperty('total_ideas');
      expect(res.body).toHaveProperty('total_votes');
      expect(res.body).toHaveProperty('overall_win_rate');
      expect(Array.isArray(res.body.ideas)).toBe(true);

      res.body.ideas.forEach((idea: any) => {
        expect(idea).toHaveProperty('id');
        expect(idea).toHaveProperty('idea_text');
        expect(idea).toHaveProperty('vote_count');
        expect(idea).toHaveProperty('win_rate');
      });
    });

    test(`should return 404 when no arenas are found for ${userType} user`, async () => {
      const res = await request(app)
        .get(`/api/arenas/${companyId}/${invalidArenaId}`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Arena not found or does not belong to the specified company');
    });

    test(`should return 500 when there is an internal server error for ${userType} user`, async () => {
      jest.spyOn(prisma.arena, 'findUnique').mockImplementationOnce(() => {
        throw new Error('Database connection failed');
      });
      const res = await request(app)
        .get(`/api/arenas/${companyId}/${invalidArenaId}`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Something went wrong');
    });
  });
});

describe('Find similar arenas: /:companyId/find_matching_arenas/:arenaId', () => {
  let companyId = 6;
  let validArenaId = 35;
  let invalidArenaId = 7;
  let adminToken = generateToken(1, true, companyId);
  let nonAdminToken = generateToken(2, false, companyId);
  let userTypes = [
    ['admin', adminToken],
    ['non-admin', nonAdminToken]
  ];

  userTypes.forEach(([userType, token]) => {
    test(`should return similar arenas for ${userType} user`, async () => {
      const res = await request(app)
        .get(`/api/arenas/${companyId}/find_matching_arenas/${validArenaId}`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name');
      }
    });

    test(`should return 404 when target arena is not found for ${userType} user`, async () => {
      jest.spyOn(prisma.arena, 'findUnique').mockResolvedValueOnce(null);

      const res = await request(app)
        .get(`/api/arenas/${companyId}/find_matching_arenas/${validArenaId}`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Target arena not found');
    });

    test(`should return 404 when selected arena has no ideas for ${userType} user`, async () => {
      const res = await request(app)
        .get(`/api/arenas/${companyId}/find_matching_arenas/27`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Selected arena has no ideas');
    });

    test(`should return 404 when no arenas are found for ${userType} user`, async () => {
      const res = await request(app)
        .get(`/api/arenas/${companyId}/find_matching_arenas/${invalidArenaId}`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No arenas with similar ideas found');
    });

    test(`should return 500 when there is an internal server error for ${userType} user`, async () => {
      jest.spyOn(prisma.arena, 'findUnique').mockImplementationOnce(() => {
        throw new Error('Database connection failed');
      });
      const res = await request(app)
        .get(`/api/arenas/${companyId}/find_matching_arenas/${validArenaId}`)
        .set('Cookie', `token=${token}`);

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Something went wrong');
    });
  });
});
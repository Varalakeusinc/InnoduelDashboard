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

const generateTestVariables = (companyId: number, validArenaId: number, invalidArenaId: number) => {
  const adminToken = generateToken(1, true, companyId);
  const nonAdminToken = generateToken(2, false, companyId);
  const userTypes = [
    ['admin', adminToken],
    ['non-admin', nonAdminToken]
  ];
  return { companyId, validArenaId, invalidArenaId, userTypes };
};

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

describe('Arena API Endpoints', () => {
  describe('Get Arenas: api/arenas/:companyId/arenas', () => {
    const { companyId, validArenaId, invalidArenaId, userTypes } = generateTestVariables(3, 70, 6);

    afterEach(() => {
      jest.clearAllMocks();
    });

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
        jest.spyOn(prisma.arena, 'findMany').mockRejectedValueOnce(new Error('Database connection failed'));

        const res = await request(app)
          .get(`/api/arenas/${companyId}/arenas`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Something went wrong');
      });
    });
  });

  describe('Get Arena By ID: api/arenas/:companyId/:id', () => {
    const { companyId, validArenaId, invalidArenaId, userTypes } = generateTestVariables(3, 70, 6);

    afterEach(() => {
      jest.clearAllMocks();
    });

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
        jest.spyOn(prisma.arena, 'findUnique').mockRejectedValueOnce(new Error('Database connection failed'));

        const res = await request(app)
          .get(`/api/arenas/${companyId}/${invalidArenaId}`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Something went wrong');
      });
    });
  });

  describe('Find similar arenas: api/arenas/:companyId/find_matching_arenas/:arenaId', () => {
    const { companyId, validArenaId, invalidArenaId, userTypes } = generateTestVariables(6, 35, 7);

    afterEach(() => {
      jest.clearAllMocks();
    });

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
        jest.spyOn(prisma.arena, 'findUnique').mockRejectedValueOnce(new Error('Database connection failed'));

        const res = await request(app)
          .get(`/api/arenas/${companyId}/find_matching_arenas/${validArenaId}`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Something went wrong');
      });
    });
  });

  describe('Get Compare Win Rates: api/arenas/:companyId/compare_win_rate/:arenaId1/:arenaId2', () => {
    const { companyId, validArenaId, invalidArenaId, userTypes } = generateTestVariables(6, 35, 7);
    const validArenaId2 = 123;

    afterEach(() => {
      jest.clearAllMocks();
    });

    userTypes.forEach(([userType, token]) => {
      test(`should return compare win rates for ${userType} user`, async () => {
        const res = await request(app)
          .get(`/api/arenas/${companyId}/compare_win_rate/${validArenaId}/${validArenaId2}`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((comparison: any) => {
          expect(comparison).toHaveProperty('idea_text');
          expect(comparison).toHaveProperty('arena1_winRate');
          expect(comparison).toHaveProperty('arena2_winRate');
          expect(typeof comparison.idea_text).toBe('string');
          expect(typeof comparison.arena1_winRate).toBe('number');
          expect(typeof comparison.arena2_winRate).toBe('number');
        });
      });

      test(`should return 400 if arenaId1 or arenaId2 are not valid integers for ${userType} user`, async () => {
        const response = await request(app)
          .get(`/api/arenas/${companyId}/compare_win_rate/${validArenaId}/validArenaId2`)
          .set('Cookie', `token=${token}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Both arenaId1 and arenaId2 must be valid integers.' });
      });

      test(`should return 404 if one or both arenas are not found for ${userType} user`, async () => {
        jest.spyOn(prisma.arena, 'findFirst').mockResolvedValueOnce(null);

        const response = await request(app)
          .get(`/api/arenas/${companyId}/compare_win_rate/${validArenaId}/${invalidArenaId}`)
          .set('Cookie', `token=${token}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'One or both arenas not found' });
      });

      test(`should return 500 if an error occurs for ${userType} user`, async () => {
        jest.spyOn(prisma.arena, 'findFirst').mockRejectedValueOnce(new Error('Database connection failed'));

        const res = await request(app)
          .get(`/api/arenas/${companyId}/compare_win_rate/${validArenaId}/${validArenaId2}`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Something went wrong');
      });
    });
  });
});

describe('Idea API Endpoints', () => {
  describe('Get All Ideas: api/ideas/:companyId/all', () => {
    const { companyId, userTypes } = generateTestVariables(3, 70, 6);

    afterEach(() => {
      jest.clearAllMocks();
    });

    userTypes.forEach(([userType, token]) => {
      test(`${userType !== 'admin' ? 'should not' : 'should'} return all ideas for ${userType} user`, async () => {
        const res = await request(app)
          .get(`/api/ideas/${companyId}/all`)
          .set('Cookie', `token=${token}`);

        if (userType === 'admin') {
          expect(res.status).toBe(200);
          expect(Array.isArray(res.body)).toBe(true);
          res.body.forEach((idea: any) => {
            expect(idea).toHaveProperty('id');
            expect(idea).toHaveProperty('idea_text');
            expect(idea).toHaveProperty('user_id');
            expect(idea).toHaveProperty('arena_id');
          })
        } else {
          expect(res.status).toBe(401);
          expect(res.text).toBe('Unauthorized');
        }
      });

      test(`should return ${userType == 'admin' ? 404 : 401} if no ideas are found for ${userType} user`, async () => {
        jest.spyOn(prisma.idea, 'findMany').mockResolvedValueOnce([]);

        const res = await request(app)
          .get(`/api/ideas/${companyId}/all`)
          .set('Cookie', `token=${token}`);

        if (userType === 'admin') {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty('message', 'No ideas found');
        } else {
          expect(res.status).toBe(401);
          expect(res.text).toBe('Unauthorized');
        }
      });

      test(`should return ${userType == 'admin' ? 500 : 401} if an error occurs for ${userType} user`, async () => {
        jest.spyOn(prisma.idea, 'findMany').mockRejectedValueOnce(new Error('Database connection failed'));

        const res = await request(app)
          .get(`/api/ideas/${companyId}/all`)
          .set('Cookie', `token=${token}`);

        if (userType === 'admin') {
          expect(res.status).toBe(500);
          expect(res.body).toHaveProperty('message', 'Something went wrong');
        } else {
          expect(res.status).toBe(401);
          expect(res.text).toBe('Unauthorized');
        }
      });
    });
  });
});

describe('Company API Endpoints', () => {
  describe('Get All Companies: api/companies/', () => {
    const { userTypes } = generateTestVariables(3, 70, 6);

    afterEach(() => {
      jest.clearAllMocks();
    });

    userTypes.forEach(([userType, token]) => {
      test(`${userType !== 'admin' ? 'should not' : 'should'} return all companies for ${userType} user`, async () => {
        const res = await request(app)
          .get('/api/companies')
          .set('Cookie', `token=${token}`);

        if (userType === 'admin') {
          expect(res.status).toBe(200);
          expect(Array.isArray(res.body)).toBe(true);
          res.body.forEach((idea: any) => {
            expect(idea).toHaveProperty('id');
            expect(idea).toHaveProperty('name');
          })
        } else {
          expect(res.status).toBe(401);
          expect(res.text).toBe('Unauthorized');
        }
      });

      test(`should return ${userType == 'admin' ? 404 : 401} if no companies are found for ${userType} user`, async () => {
        jest.spyOn(prisma.company, 'findMany').mockResolvedValueOnce([]);

        const res = await request(app)
          .get(`/api/companies`)
          .set('Cookie', `token=${token}`);

        if (userType === 'admin') {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty('message', 'No companies found');
        } else {
          expect(res.status).toBe(401);
          expect(res.text).toBe('Unauthorized');
        }
      });

      test(`should return ${userType == 'admin' ? 500 : 401} if an error occurs for ${userType} user`, async () => {
        jest.spyOn(prisma.company, 'findMany').mockRejectedValueOnce(new Error('Database connection failed'));

        const res = await request(app)
          .get(`/api/companies`)
          .set('Cookie', `token=${token}`);

        if (userType === 'admin') {
          expect(res.status).toBe(500);
          expect(res.body).toHaveProperty('message', 'Something went wrong');
        } else {
          expect(res.status).toBe(401);
          expect(res.text).toBe('Unauthorized');
        }
      });
    });
  });
});

describe('Export Excel Endpoint', () => {
  describe('GET Excel Reports: /api/reports/:companyId/excel', () => {
    const { companyId, userTypes } = generateTestVariables(3, 70, 6);

    afterEach(() => {
      jest.clearAllMocks();
    });
    
    app.use((req, res, next) => {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment;');
      next();
    });

    userTypes.forEach(([userType, token]) => {
      test(`should successfully export excel file for ${userType} user`, async () => {
        const res = await request(app)
          .get(`/api/reports/${companyId}/excel`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        expect(res.headers['content-disposition']).toContain('attachment;');
      });

      test(`should return 404 if company is not found for ${userType} user`, async () => {
        jest.spyOn(prisma.company, 'findUnique').mockResolvedValueOnce(null);

        const res = await request(app)
          .get(`/api/reports/${companyId}/excel`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'Company not found' });
      });

      test(`should return 404 if no arenas are found for the company for ${userType} user`, async () => {
        jest.spyOn(prisma.arena, 'findMany').mockResolvedValueOnce([]);

        const res = await request(app)
          .get(`/api/reports/${companyId}/excel`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'No arenas found' });
      });

      test(`should return 500 if an error occurs while exporting arenas for ${userType} user`, async () => {
        jest.spyOn(prisma.company, 'findUnique').mockRejectedValueOnce(new Error('Failed to fetch company'));

        const res = await request(app)
          .get(`/api/reports/${companyId}/excel`)
          .set('Cookie', `token=${token}`);

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Something went wrong');
      });
    });
  });
});
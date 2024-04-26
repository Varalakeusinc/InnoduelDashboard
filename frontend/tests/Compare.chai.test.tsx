import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from "chai";
import { describe, it } from '@jest/globals';

chai.should();
chai.use(chaiHttp);

const serverUrl = "http://localhost:5173"; 

// this doesn't work because of some syntaxerror

describe('Compare API Endpoints', () => {
  it('should compare two items successfully', done => {
    chai.request(serverUrl)
        .get('/api/compare') // Adjust the method and endpoint
        .query({ item1: 'apple', item2: 'orange' }) // Example query params
        .end((_err: any, res: { body: { result: any; }; }) => {
            expect(res.body).to.be.an('object');
            expect(res.body.result).to.exist; // Example assertion
            done();
        });
  });
});


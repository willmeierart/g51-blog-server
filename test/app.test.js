const expect = require('chai').expect
const knex = require('../db/knex')
const request = require('supertest')
const app = require('../app')
const fixtures = require('./fixtures')

//
//
// describe('CRUD artworks', () => {
//     before((done) => {
//         knex.migrate.latest()
//             .then(() => {
//                 return knex.seed.run()
//             }).then(() => done())
//     })
//
//
//     it('Lists all Records', (done) => {
//         request(app)
//             .get('/api/v1/artworks')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((response)=>{
//                 expect(response.body).to.be.a('array')
//                 expect(response.body).to.deep.equal(fixtures.artworks)
//                 done()
//             })
//     })
//
//     it('Show one Record by id', (done) => {
//         request(app)
//             .get('/api/v1/artworks/1')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((response)=>{
//                 expect(response.body).to.be.a('object')
//                 expect(response.body).to.deep.equal(fixtures.artworks[0])
//                 done()
//             })
//     })
//
//     it('Show one Record by id', (done) => {
//         request(app)
//             .get('/api/v1/artworks/5')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((response)=>{
//                 expect(response.body).to.be.a('object')
//                 expect(response.body).to.deep.equal(fixtures.artworks[4])
//                 done()
//             })
//     })
//
//     it('Creates a record', (done)=>{
//         request(app)
//         .post('/api/v1/artworks')
//         .send(fixtures.artwork)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response)=>{
//             expect(response.body).to.be.a('object')
//             fixtures.artwork.id = response.body.id
//             expect(response.body).to.deep.equal(fixtures.artwork)
//             done()
//         })
//     })
//     it('Updates a record', (done)=>{
//         fixtures.artwork.medium = 'light, mixed'
//         request(app)
//         .put('/api/v1/artworks/17')
//         .send(fixtures.artwork)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response)=>{
//             expect(response.body).to.be.a('object')
//             fixtures.artwork.id = response.body.id
//             expect(response.body).to.deep.equal(fixtures.artwork)
//             done()
//         })
//     })
//     it('Deletes a record', (done)=>{
//         request(app)
//         .delete('/api/v1/artworks/10')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response)=>{
//             expect(response.body).to.be.a('object')
//             expect(response.body).to.deep.equal({
//                 deleted:true
//             })
//             done()
//         })
//     })
// })

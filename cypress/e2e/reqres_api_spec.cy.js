describe('ReqRes API - Full Test Suite', () => {

    // List Users
    it('should fetch a list of users', () => {
      cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
        // Validate status code
        expect(response.status).to.eq(200);
  
        // Validate the response has a 'data' property containing an array of users
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.greaterThan(0); // Users exist
      });
    });
  
    // Single User
    it('should fetch a single user by ID', () => {
      cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
        // Validate status code
        expect(response.status).to.eq(200);
  
        // Validate user data
        expect(response.body).to.have.property('data');
        expect(response.body.data.id).to.eq(2); // Check if ID is correct
      });
    });
  
    // Single User Not Found
    it('should return 404 for a non-existent user', () => {
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/23',
        failOnStatusCode: false // Prevent Cypress from failing automatically on 404
      }).then((response) => {
        // Validate 404 status code
        expect(response.status).to.eq(404);
      });
    });
  
    // Create User
    it('should create a new user', () => {
      const newUser = {
        name: "Sudheesh",
        job: "Engineer"
      };
  
      cy.request('POST', 'https://reqres.in/api/users', newUser).then((response) => {
        // Validate status code (201 for successful creation)
        expect(response.status).to.eq(201);
  
        // Validate created user details
        expect(response.body).to.have.property('name', 'Sudheesh');
        expect(response.body).to.have.property('job', 'Engineer');
      });
    });
  
    // Update User
    it('should update an existing user', () => {
      const updatedUser = {
        name: "Sudheesh Patwardhan",
        job: "Senior Engineer"
      };
  
      cy.request('PUT', 'https://reqres.in/api/users/2', updatedUser).then((response) => {
        // Validate status code (200 for successful update)
        expect(response.status).to.eq(200);
  
        // Validate updated user details
        expect(response.body).to.have.property('name', 'Sudheesh Patwardhan');
        expect(response.body).to.have.property('job', 'Senior Engineer');
      });
    });
  
    // Delete User
    it('should delete a user by ID', () => {
      cy.request('DELETE', 'https://reqres.in/api/users/2').then((response) => {
        // Validate status code (204 for successful deletion)
        expect(response.status).to.eq(204);
      });
    });
  
    // List Resource
    it('should fetch a list of resources', () => {
      cy.request('GET', 'https://reqres.in/api/unknown').then((response) => {
        // Validate status code
        expect(response.status).to.eq(200);
  
        // Validate the response contains a 'data' array of resources
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.greaterThan(0); // Resources exist
      });
    });
  
    // Single Resource
    it('should fetch a single resource by ID', () => {
      cy.request('GET', 'https://reqres.in/api/unknown/2').then((response) => {
        // Validate status code
        expect(response.status).to.eq(200);
  
        // Validate resource data
        expect(response.body).to.have.property('data');
        expect(response.body.data.id).to.eq(2); // Check if resource ID is correct
      });
    });
  
    // Single Resource Not Found
    it('should return 404 for a non-existent resource', () => {
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/unknown/23',
        failOnStatusCode: false // Prevent Cypress from failing automatically on 404
      }).then((response) => {
        // Validate 404 status code for non-existent resource
        expect(response.status).to.eq(404);
      });
    });
  
    // Register User (Successful)
    it('should register a new user successfully', () => {
      const registerDetails = {
        email: "eve.holt@reqres.in",
        password: "pistol"
      };
  
      cy.request('POST', 'https://reqres.in/api/register', registerDetails).then((response) => {
        // Validate status code
        expect(response.status).to.eq(200);
  
        // Validate response contains token
        expect(response.body).to.have.property('token');
      });
    });
  
    // Register User (Unsuccessful)
    it('should fail to register a user with missing password', () => {
      const registerDetails = {
        email: "sydney@fife"
      };
  
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/register',
        body: registerDetails,
        failOnStatusCode: false // Prevent Cypress from failing automatically on 400
      }).then((response) => {
        // Validate 400 status code for missing password
        expect(response.status).to.eq(400);
  
        // Validate error message
        expect(response.body).to.have.property('error', 'Missing password');
      });
    });
  
    // Login User (Successful)
    it('should log in a user successfully', () => {
      const loginDetails = {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      };
  
      cy.request('POST', 'https://reqres.in/api/login', loginDetails).then((response) => {
        // Validate status code
        expect(response.status).to.eq(200);
  
        // Validate response contains token
        expect(response.body).to.have.property('token');
      });
    });
  
    // Login User (Unsuccessful)
    it('should fail to log in with missing password', () => {
      const loginDetails = {
        email: "peter@klaven"
      };
  
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        body: loginDetails,
        failOnStatusCode: false // Prevent Cypress from failing automatically on 400
      }).then((response) => {
        // Validate 400 status code for missing password
        expect(response.status).to.eq(400);
  
        // Validate error message
        expect(response.body).to.have.property('error', 'Missing password');
      });
    });
  
    // Delayed Response
    it('should fetch a list of users with a delay', () => {
      cy.request('GET', 'https://reqres.in/api/users?delay=3').then((response) => {
        // Validate status code
        expect(response.status).to.eq(200);
  
        // Validate response contains data
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');
      });
    });
  
  });
  
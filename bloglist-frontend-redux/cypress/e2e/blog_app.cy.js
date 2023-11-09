describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jon Love',
      username: 'Jon',
      password: '123'
    }
    const user1 = {
      name: 'Test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Username:')
    cy.contains('Password:')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Jon')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('Jon Love is logged in.')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('oops')
      cy.get('#password').type('nope')
      cy.get('#login-button').click()

      cy.get('.notificationMessage')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Jon', password: '123' })
    })

    it('A blog can be created', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title-input').type('This is a blog title')
      cy.get('#author-input').type('Cypress tester')
      cy.get('#url-input').type('some url')
      cy.get('#create-button').click()

      cy.contains('This is a blog title - Cypress tester')
    })
    describe('With blogs premade', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Testing here',
          author: 'some tester',
          url: 'some url',
          likes: 10
        })
        cy.createBlog({
          title: 'A second test',
          author: 'some other tester',
          url: 'some other url',
          likes: 5
        })
      })
      it('User can like a blog', function() {
        cy.get('#view-hide-button').click()
        cy.get('#like-button').click()
        cy.contains('Likes: 11')
      })
      it('User can delete own blog', function() {
        cy.get('#view-hide-button').click()
        cy.get('#remove-button').click()

        cy.get('.notificationMessage')
          .should('contain', 'Blog deleted')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })
      it('user can log out', function() {
        cy.get('#logout-button').click()
      })
    })

  })
  describe('Different user is logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Jon', password: '123' })
      cy.createBlog({
        title: 'Five likes',
        author: 'five',
        url: 'some url',
        likes: 5
      })
      cy.createBlog({
        title: 'Twenty likes',
        author: 'twenty',
        url: 'some other url',
        likes: 20
      })
      cy.createBlog({
        title: 'Ten likes',
        author: 'ten',
        url: 'some other url',
        likes: 10
      })
      cy.get('#logout-button').click()
      cy.login({ username: 'test', password: 'test' })
    })
    it('User cant delete other users blog', function() {
      cy.get('#view-hide-button').click()
      cy.contains('Remove').should('not.exist')
    })
    it.only('Check if most liked blogs order is correct', function() {
      cy.get('.blogFullInfoDisplay>p').eq(0)
      cy.contains('Twenty likes - twenty')
      cy.get('.blogFullInfoDisplay>p').eq(1)
      cy.contains('Ten likes - ten')
    })
  })
})
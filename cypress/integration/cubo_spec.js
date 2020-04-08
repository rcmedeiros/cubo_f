describe('Cubo Form', function () {
  beforeEach(function () {
    cy.visit('http://localhost:4200');
  });

  it('Submit form with missing fields', function () {
    cy.get('button[name=send]').click();

    cy.contains('First name is required');
    cy.contains('Last name is required');
    cy.contains('Participation is required');
  });

  it('Submit value', function () {
    cy.get('input[name=firstName]').type('Carlos');
    cy.get('input[name=lastName]').type('Moura');
    cy.get('input[name=participation]').type(50);
    cy.get('button[name=send]').click();

    cy.get('table').contains('td', 'Carlos');
    cy.get('table').contains('td', '50%');
    cy.get('table').find('tr').should('have.length', 2);
  });

  it('Submit different value to the same person', function () {
    cy.get('input[name=firstName]').type('Carlos');
    cy.get('input[name=lastName]').type('Moura');
    cy.get('input[name=participation]').type(5);
    cy.get('button[name=send]').click();

    cy.get('table').contains('td', 'Carlos');
    cy.get('table').contains('td', '5%');
    cy.get('table').find('tr').should('have.length', 2);
  });

  it('Submit different person', function () {
    cy.get('input[name=firstName]').type('Fernanda');
    cy.get('input[name=lastName]').type('Oliveira');
    cy.get('input[name=participation]').type(15);
    cy.get('button[name=send]').click();

    cy.get('table').contains('td', 'Fernanda');
    cy.get('table').contains('td', 'Oliveira');
    cy.get('table').contains('td', '15%');
    cy.get('table').find('tr').should('have.length', 3);
  });

  it('Submit different person', function () {
    cy.get('input[name=firstName]').type('Hugo');
    cy.get('input[name=lastName]').type('Silva');
    cy.get('input[name=participation]').type(20);
    cy.get('button[name=send]').click();

    cy.get('table').contains('td', 'Hugo');
    cy.get('table').contains('td', 'Silva');
    cy.get('table').contains('td', '20%');
    cy.get('table').find('tr').should('have.length', 4);
  });

  it('Submit different person', function () {
    cy.get('input[name=firstName]').type('Eliza');
    cy.get('input[name=lastName]').type('Souza');
    cy.get('input[name=participation]').type(20);
    cy.get('button[name=send]').click();

    cy.get('table').contains('td', 'Eliza');
    cy.get('table').contains('td', 'Souza');
    cy.get('table').contains('td', '20%');
    cy.get('table').find('tr').should('have.length', 5);
  });

  it('Submit different person', function () {
    cy.get('input[name=firstName]').type('Anderson');
    cy.get('input[name=lastName]').type('Santos');
    cy.get('input[name=participation]').type(40);
    cy.get('button[name=send]').click();

    cy.get('table').contains('td', 'Anderson');
    cy.get('table').contains('td', 'Santos');
    cy.get('table').contains('td', '40%');
    cy.get('table').find('tr').should('have.length', 6);
  });

  it('Forbids more than 100%', function () {
    cy.get('input[name=firstName]').type('Rafael');
    cy.get('input[name=lastName]').type('Medeiros');
    cy.get('input[name=participation]').type(1);
    cy.get('button[name=send]').click();

    cy.contains('All participation values should sum up to 100');
  });
});

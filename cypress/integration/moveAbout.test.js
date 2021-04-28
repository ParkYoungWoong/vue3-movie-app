/**
 * 메인 페이지로 접근.
 * Header About 내비게이션을 선택.
 * About 페이지로 이동
 * Movie 페이지로 이동
 * Header 사용자 로고 선택
 * About 페이지로 이동
 */
describe('개발자 페이지 이동', () => {
  it('메인 페이지로 접근합니다', () => {
    cy.visit('/')
    cy.get('header .nav-link')
      .contains('.active', 'Search')
  })

  it('About 페이지로 이동합니다', () => {
    cy.get('header .nav-link')
      .contains('About')
      .click()
    cy.url()
      .should('include', '/about')
    cy.wait(1000)
    cy.get('.name')
      .contains('HEROPY')
  })

  it('영화 상세 페이지로 이동합니다', () => {
    cy.get('header .nav-link')
      .contains('Movie')
      .click()
    cy.url()
      .should('include', '/movie')
  })

  it('About 페이지로 이동합니다', () => {
    cy.get('header .user')
      .click()
    cy.url()
      .should('include', '/about')
    cy.wait(1000)
    cy.get('.name')
      .contains('HEROPY')
  })
})

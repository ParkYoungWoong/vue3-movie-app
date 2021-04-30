/**
 * 메인 페이지로 접근한 후,
 * Header About 내비게이션 버튼을 클릭하면,
 * About 페이지에서 정보를 확인할 수 있습니다.
 * 그리고 잠시 Movie 페이지로 이동한 후,
 * Header 사용자 로고를 클릭하면,
 * 다시 About 페이지에서 정보를 확인할 수 있습니다.
 */
describe('About 페이지로 이동', () => {
  it('메인 페이지로 접근합니다', () => {
    cy.visit('/')
    // Search 내비게이션 버튼의 활성화(active) 확인!
    cy.get('header .nav-link.active')
      .contains('Search')
  })

  it('About 페이지로 이동합니다', () => {
    // About 내비게이션 버튼 클릭!
    cy.get('header .nav-link')
      .contains('About')
      .click()
    // 이동한 페이지 주소 확인!
    cy.url()
      .should('include', '/about')
    // 페이지 렌더링 기다리기!
    cy.wait(1000)
    // About 내비게이션 버튼의 활성화(active) 확인!
    cy.get('header .nav-link.active')
      .contains('About')
    // About 이름이 'HEROPY'인지 확인!
    cy.get('.name')
      .contains('HEROPY')
  })

  it('영화 상세 페이지로 이동합니다', () => {
    // Movie 내비게이션 버튼 클릭!
    cy.get('header .nav-link')
      .contains('Movie')
      .click()
    // 이동한 페이지 주소 확인!
    cy.url()
      .should('include', '/movie')
  })

  it('About 페이지로 이동합니다', () => {
    // Header 우측의 사용자 로고 클릭!
    cy.get('header .user')
      .click()
    // 이동한 페이지 주소 확인!
    cy.url()
      .should('include', '/about')
    // 페이지 렌더링 기다리기!
    cy.wait(1000)
    // About 내비게이션 버튼의 활성화(active) 확인!
    cy.get('header .nav-link.active')
      .contains('About')
    // About 이름이 'HEROPY'인지 확인!
    cy.get('.name')
      .contains('HEROPY')
  })
})

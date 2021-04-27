describe('영화 검색(겨울왕국2)', () => {
  it('검색 페이지로 접근합니다', () => {
    cy.visit('/')
    // 검색 내비게이션 버튼의 활성화(active) 확인!
    cy.get('header .nav-link')
      .eq(0)
      .contains('.active', 'Search')
  })

  it('영화를 검색합니다', () => {
    // 영화 제목 입력!
    cy.get('.form-control')
      .clear()
      .type('frozen')
    // 검색할 최대 개수 입력!
    cy.get('.search__number')
      .select('30')
    // Apply 버튼 선택!(검색 시작)
    cy.get('.btn')
      .click()
    // 검색 완료 기다리기!
    cy.wait(1500)
    // 검색된 영화 아이템 개수를 확인!
    cy.get('.movie')
      .should('have.length', 30)
  })

  it('첫번째 영화 아이템(겨울왕국)을 선택합니다', () => {
    // 1번째(Zero-based) 영화 아이템을 선택!
    cy.get('.movie')
      .eq(1)
      .click()
    // 이동한 페이지 주소 확인!
    cy.url()
      .should('include', '/movie/tt4520988')
  })

  it('영화 상세 정보를 확인합니다', () => {
    // 페이지 이동 기다리기!
    cy.wait(1500)
    // 영화 제목이 '겨울왕국2'인지 확인!
    cy.get('.title')
      .contains('Frozen II')
    // 영화 포스터가 고해상도 이미지인지 확인!
    cy.get('.poster')
      .should('have.attr', 'style')
      .and('include', 'SX700.jpg')
  })
})

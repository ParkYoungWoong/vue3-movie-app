import { shallowMount } from '@vue/test-utils'
import Search from '~/components/Search'

describe('components/Search.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Search)
  })

  test('선택 가능한 연도의 개수가 일치합니다', () => {
    // 설정
    const year = wrapper.vm.filters.find(f => f.name === 'year')
    const yearLength = new Date().getFullYear() - 1985 + 1
    // 동작
    // 확인
    expect(year.items.length).toBe(yearLength)
  })
})

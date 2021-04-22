import { shallowMount } from '@vue/test-utils'
import Header from '~/components/Header'

describe('components/Header.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Header, {
      global: {
        stubs: ['RouterLink'],
        mocks: {
          $store: {
            state: {
              about: {
                image: ''
              }
            }
          },
          $route: {
            fullPath: '/movie/tt1234567'
          }
        }
      }
    })
  })

  test('경로 정규표현식이 없는 경우 일치하지 않습니다', () => {
    // 설정
    const regExp = undefined
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })

  test('경로 정규표현식과 일치해야 합니다', () => {
    // 설정
    const regExp = /^\/movie/
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(true)
  })

  test('경로 정규표현식과 일치하지 않아야 합니다', () => {
    // 설정
    const regExp = /^\/heropy/
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })
})

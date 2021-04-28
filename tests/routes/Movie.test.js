import { shallowMount } from '@vue/test-utils'
import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'
import Movie from '~/routes/Movie'

describe('routes/Movie.vue', () => {
  let wrapper
  const spy = {}

  beforeEach(async () => {
    window.scrollTo = jest.fn() // Mock
    router.push('/movie/tt1234567')
    await router.isReady()
    spy.requestDiffSizeImage = jest.spyOn(Movie.methods, 'requestDiffSizeImage')
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ],
        mocks: {
          $loadImage: jest.fn().mockResolvedValue()
        }
      }
    })
  })

  test('최초 접속한 URL의 파라미터를 확인합니다', () => {
    // 설정
    // 동작
    // 확인
    expect(wrapper.vm.$route.params.id).toBe('tt1234567')
  })

  test('지정한 이미지 크기로 URL을 변경합니다', () => {
    // 설정
    const url = 'https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_SX300.jpg'
    // 동작
    // 확인
    expect(wrapper.vm.requestDiffSizeImage(url)).toContain('SX700')
    expect(wrapper.vm.requestDiffSizeImage(url, 400)).toContain('SX400')
  })
})

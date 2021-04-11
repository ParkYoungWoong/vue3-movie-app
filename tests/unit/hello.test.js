import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'
import Movie from '~/routes/Movie'

describe('/', () => {
  let wrapper
  const url = 'https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_SX300.jpg'

  beforeEach(async () => {
    router.push('/')
    await router.isReady()
    // Mock
    window.scrollTo = jest.fn()
  })

  test('원하는 이미지 크기의 url로 변경합니다', () => {
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    })

    expect(wrapper.vm.requestDiffSizeImage(url))
      .toContain('SX700')
    expect(wrapper.vm.requestDiffSizeImage(url, 400))
      .toContain('SX400')
  })  
  test('이미지 요청 후 로딩이 종료됩니다', async () => {
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
    const spy = jest.spyOn(wrapper.vm, '$loadImage')
    wrapper.vm.requestDiffSizeImage(url)
    expect(spy).toHaveBeenCalled()
    
    //  DOM 업데이트를 기다립니다.
    await flushPromises()
    expect(wrapper.vm.imageLoading).toBe(false)
  })
})
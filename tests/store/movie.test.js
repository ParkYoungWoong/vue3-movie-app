import axios from 'axios'
import movieStore from '~/store/movie'
import _cloneDeep from 'lodash/cloneDeep'

jest.mock('axios')

describe('store/movie.js', () => {
  let store
  beforeEach(() => {
    store = _cloneDeep(movieStore)
    store.state = movieStore.state()
    store.commit = function (name, payload) {
      store.mutations[name](store.state, payload)
    }
    store.dispatch = function (name, payload) {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch
      }
      return store.actions[name](context, payload)
    }
  })

  test('데이터 초기화를 확인', async () => {
    // 설정
    store.commit('updateState', {
      movies: [{ imdbID: '1' }],
      message: 'Hello world',
      loading: true
    })
    // 동작
    store.commit('resetMovies')
    // 확인
    expect(store.state.movies).toEqual([])
    expect(store.state.message).toBe('Search for the movie title!')
    expect(store.state.loading).toBe(false)
  })

  test('영화 목록을 잘 가져온 경우', async () => {
    // 설정
    const res = {
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }
    axios.post.mockResolvedValue(res)
    // 동작
    await store.dispatch('searchMovies')
    // 확인
    expect(store.state.movies).toEqual(res.data.Search)
  })

  test('영화 목록을 가져오지 못한 경우', async () => {
    // 설정
    const errorMessage = 'Network Error.'
    axios.post.mockRejectedValue(new Error(errorMessage))
    // 동작
    await store.dispatch('searchMovies')
    // 확인
    expect(store.state.message).toBe(errorMessage)
  })

  test('영화 아이템이 중복된 경우', async () => {
    // 설정
    const res = {
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }
    axios.post.mockResolvedValue(res)
    // 동작
    await store.dispatch('searchMovies')
    // 확인
    expect(store.state.movies.length).toBe(1)
  })

  test('단일 영화의 상세 정보를 잘 가져온 경우', async () => {
    // 설정
    const res = {
      data: {
        imdbId: '1',
        Title: 'Frozen',
        Poster: 'frozen.png',
        Year: '2021'
      }
    }
    axios.post.mockResolvedValue(res)
    // 동작
    await store.dispatch('searchMovieWithId')
    // 확인
    expect(store.state.theMovie.Title).toBe('Frozen')
    expect(store.state.theMovie.Poster).toBe('frozen.png')
  })
})

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
    store.commit('updateState', {
      movies: [{ imdbID: 'abc123' }],
      message: 'Hello world',
      loading: true
    })

    await store.dispatch('initMovies')
    expect(store.state.movies).toEqual([])
    expect(store.state.message).toBe('Search for the movie title!')
    expect(store.state.loading).toBe(false)
  })

  test('영화 목록을 잘 가져온 경우', async () => {
    // 설정
    const Search = [
      {
        imdbID: 'abc123',
        Title: 'Hello',
        Poster: 'image.jpg',
        Year: '2021'
      }
    ]
    axios.post.mockResolvedValue({
      data: {
        totalResults: '1',
        Search
      }
    })
    // 동작
    await store.dispatch('searchMovie')
    // 확인
    expect(store.state.movies).toEqual(Search)
  })

  test('영화 목록을 가져오지 못한 경우', async () => {
    axios.post.mockRejectedValue('Network Error.')
    await store.dispatch('searchMovie')
    expect(store.state.message).toBe('Network Error.')
  })
})

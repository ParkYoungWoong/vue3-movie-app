import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // 현재 파일(movie.js)을 Store 모듈로 활용하려면 다음 옵션이 필요합니다.
  namespaced: true,

  // Vue.js data 옵션과 유사합니다.
  // 상태(State)는 함수로 만들어서 객체 데이터를 반환해야 가변 이슈(데이터 불변성)가 발생하지 않습니다!
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),

  // Vue.js computed 옵션과 유사합니다.
  getters: {},

  // Vue.js methods 옵션과 유사합니다.
  // 상태(State)는 변이(Mutations)를 통해서만 값을 바꿀 수 있습니다.
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },

  // Vue.js methods 옵션과 유사합니다.
  // 변이(Mutations)가 아닌 나머지 모든 로직을 관리합니다.
  // 비동기로 동작합니다.
  actions: {
    async searchMovies({ state, commit }, payload) {
      // const { title, type, number, year } = payload
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })

        // ceil = 올림!
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10) // 총 페이지의 길이

        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch ({ message }) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      // const { id } = payload
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true,
      })

      try {
        const res = await _fetchMovie(payload)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

// eslint-disable-next-line
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}

import axios from 'axios'
import _unionBy from 'lodash/unionBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    initMovies({ commit }) {
      commit('updateState', {
        movies: [],
        message: _defaultMessage,
        loading: false
      })
    },
    async searchMovies({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })
      let total = 0

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: Search
        })
        total = parseInt(totalResults, 10)

      } catch (message) {
        commit('updateState', {
          movie: [],
          message,
          loading: false
        })
        return
      }

      // 추가 요청..
      // ceil = 올림!
      const pageLength = Math.ceil(total / 10)
      console.log(pageLength)

      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > (payload.number / 10)) break
          // const res = await _fetchMovie({
          //   ...payload,
          //   page
          // })
          const res = await axios.post('/.netlify/functions/movie', {
            ...payload,
            page
          })
          const { Search } = res.data
          commit('updateState', {
            movies: _unionBy(state.movies, Search, 'imdbID')
          })
        }
      }

      commit('updateState', {
        loading: false
      })
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true,
      })

      try {
        // const res = await _fetchMovie(payload)
        const res = await axios.post('/.netlify/functions/movie', payload)
        commit('updateState', {
          theMovie: res.data,
          loading: false
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {},
          loading: false
        })
      }
    }
  }
}

// eslint-disable-next-line
function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        if (res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

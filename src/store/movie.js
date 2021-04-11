import axios from 'axios'

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
    async searchMovie({ state, commit }, payload) {
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
          movies: Search,
          loading: false
        })
        total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
        console.log(pageLength)

      } catch (message) {
        commit('updateState', {
          movie: [],
          message,
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true,
      })

      try {
        const res = await _fetchMovie(payload)
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

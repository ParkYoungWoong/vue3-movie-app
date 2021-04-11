<template>
  <div>
    <Headline />
    <Search />
    <MovieList />
  </div>
</template>

<script>
import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'

export default {
  components: {
    Headline,
    Search,
    MovieList
  },
  mounted() {
    this.$store.dispatch('movie/initMovies')
  }
}
</script>
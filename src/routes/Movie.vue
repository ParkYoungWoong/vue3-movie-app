<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="3"
        :z-index="9"
        fixed />
    </template>
    <template v-else>
      <div class="movie-details">
        <div 
          :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})` }"
          class="poster">
          <Loader
            v-if="imageLoading"
            absolute />
        </div>
        <div class="specs">
          <div class="title">
            {{ theMovie.Title }}
          </div>
          <div class="labels">
            <span>{{ theMovie.Released }}</span>
            <span>{{ theMovie.Runtime }}</span>
            <span>{{ theMovie.Country }}</span>
          </div>
          <div class="plot">
            {{ theMovie.Plot }}
          </div>
          <div class="ratings">
            <h3>Ratings</h3>
            <div class="rating-wrap">
              <div 
                v-for="{ Source: name, Value: score } in theMovie.Ratings"
                :key="name"
                :title="name"
                class="rating">
                <img
                  :src="`https://raw.githubusercontent.com/HeropCode/Svelte-Movie-app/master/public/assets/${name}.png`"
                  :alt="name" />
                <span>{{ score }}</span>
              </div>
            </div>
          </div>
          <div>
            <h3>Actors</h3>
            {{ theMovie.Actors }}
          </div>
          <div>
            <h3>Director</h3>
            {{ theMovie.Director }}
          </div>
          <div>
            <h3>Production</h3>
            {{ theMovie.Production }}
          </div>
          <div>
            <h3>Genre</h3>
            {{ theMovie.Genre }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    loading() {
      return this.$store.state.movie.loading
    },
    theMovie() {
      return this.$store.state.movie.theMovie
    }
  },
  created() {
    this.$store.dispatch('movie/searchMovieWithId', {
      id: this.$route.params.id
    })
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      if (!url) {
        return ''
      }
      const src = url.replace('SX300', `SX${size}`)
      this.$loadImage(src)
        .then(() => {
          this.imageLoading = false
        })
      return src
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

.container {
  padding: 40px 0 0;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
  }
  .specs {
    flex: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: rgba(#000, .1);
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px; 
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: rgba(#000, .1);
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .specs {
    .title {
      color: #000;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: #000;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
    }
  }
}
</style>
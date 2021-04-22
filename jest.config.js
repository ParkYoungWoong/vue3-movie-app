module.exports = {
  // 파일 확장자를 지정하지 않은 경우, Jest가 검색할 확장자 목록입니다.
  // 일반적으로 많이 사용되는 모듈의 확장자를 지정합니다.
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],

  // `~` 같은 경로 별칭을 매핑합니다.
  // E.g. `import HelloWorld from '~/components/HelloWorld.vue';`
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },

  // 테스트 환경을 지정합니다.
  // jsdom의 최신 버전을 별도 사용하는 경우에는,
  // 다음과 같이 해당 모듈을 설치 후 옵션을 지정합니다.
  testEnvironment: 'jest-environment-jsdom-sixteen',

  // jsdom 환경에 대한 URL을 설정합니다.
  // https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost/',

  // 정규식과 일치하는 파일의 변환 모듈을 지정합니다.
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  }
}

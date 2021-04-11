# Vue3 Movie app

Vue3와 OMDb API를 사용하는 영화 검색 애플리케이션입니다.<br>
[vue3-webpack-template#vue-router](https://github.com/ParkYoungWoong/vue3-webpack-template)에서 프로젝트를 시작합니다.

[DEMO](https://stupefied-hodgkin-d9d350.netlify.app/)

## 💡 Specs

- Vue3
- Vuex
- Vue-Router
- Webpack
- OMDb API
- Netlify
  - Hosting with GitHub(Continuous Deployment)
  - Functions(Serverless)
- Axios
- Lodash
- Tests
  - Jest
  - Vue Test Utils
  - Cypress

## 🎯 Goals

- Vuex(Store)로 중앙 집중식 데이터를 처리하고 네임스페이스를 관리할 수 있습니다.
- SPA(Single Page Application)를 위한 Vue Router를 구성해 Hash 기반의 페이지 단위로 개발할 수 있습니다.
- OMDb API를 활용해 실제 영화 정보를 검색하고 출력할 수 있습니다.
- Vue 플러그인을 생성하고 적용할 수 있습니다.
- API Key가 노출되지 않도록 Netlify Functions(서버리스 함수)를 사용해 백엔드를 구성하고, 로컬해서 테스트할 수 있습니다.
- GitHub 저장소에 Push(업로드)하고 Netlify Hosting으로 CD(지속적인 배포)를 적용할 수 있습니다.

## 📦 Packages

> 설치할 각 패키지(모듈)의 설치 버전이 예제와 다른 경우 사용법이 달라질 수 있습니다.<br>
> 모든 패키지를 완성 예제의 [package.json](https://github.com/ParkYoungWoong/vue3-movie-app/blob/master/package.json) 파일에 명시된 버전과 동일하게 설치하는 것을 권장합니다.

netlify-cli: Netlify 명령을 사용해 로컬에서 프로젝트와 서버리스 함수가 통신하기 위해 사용합니다.
dotenv: 영화 정보의 API KEY를 환경 변수로 지정하기 위해 사용합니다.
dotenv-webpack: Webpack에서 dotenv로 환경 변수를 설정합니다.
axios:  HTTP 클라이언트 라이브러리로, OMDb API를 통해 영화 정보를 요청하기 위해 사용합니다.
lodash: 다양한 유틸리티 기능을 제공하는 자바스크립트 라이브러리입니다.

## 📚 Refs

### HTML Entities in numeric order

http://www.evotech.net/blog/2007/04/named-html-entities-in-numeric-order/

## 🤔 Issues..

[Add issue!](https://github.com/ParkYoungWoong/vue3-movie-app/issues/new)

- Add unit test
- Add e2e test
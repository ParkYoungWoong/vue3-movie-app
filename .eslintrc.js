module.exports = {
  // 사전에 정의된 전역 변수를 설정합니다.
  env: {
    browser: true,
    node: true
  },

  // 사용 가능한 규칙 세트입니다.
  extends: [
    // 'plugin:vue/vue3-essential', // Vue Lv1
    'plugin:vue/vue3-strongly-recommended', // Vue Lv2
    // 'plugin:vue/vue3-recommended', // Vue Lv3
    'eslint:recommended'
  ],

  // 구문 분석할 패키지를 설정합니다.(Babel, ES6^ => ES5)
  parserOptions: {
    parser: 'babel-eslint'
  },

  // 추가적인 코드 규칙을 설정합니다.
  rules: {
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }]
  },

  // 패턴에 일치하는 파일에는 jest 문법을 재정의합니다.
  // 테스트를 위한 파일을 지정합니다.
  overrides: [
    {
      files: [
        '**/__tests__/*.js',
        '**/tests/unit/**/*.test.js'
      ],
      env: {
        jest: true
      }
    }
  ]
}

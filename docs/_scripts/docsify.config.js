window.$docsify = {
  // name: '提瓦特大学',
  name: 'TEYVAT UNIVERSITY PRESS',
  repo: 'Kozmos941/teyvat-university-press',
  coverpage: true,
  onlyCover: true,
  plugins: [
    元素命名法
  ],
  markdown: {
    // smartypants: true,
    renderer: {
      em: (text) => `<term>${text}</term>`
    }
  }
}


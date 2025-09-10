// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断。panduandangqianhuanjing
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV)
// console.log(import.meta.env.PROD)
// console.log(import.meta.env.SSR)

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://www.codercba.com:5000'
} else {
  BASE_URL = 'http://www.codercba.com:5000'
}
console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }

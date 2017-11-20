export default self.$config = {
  // 左下角也会有个按钮用于切换侧边栏
  disableSidebarToggle: false,
  // 显示 h2 到 h4 的标题
  tocVisibleDepth: 3,
  sidebar: false,
  // 使用 marked 来解析 markdown 代码
  marked: {
    smartypants: true
    // ...
  },
  // 将 debug 设置为 true 来启用浏览器的 vue-devtools 插件
  debug: true
}
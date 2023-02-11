module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    // [
    //   "import",
    //   {
    //     "libraryName": "view-ui-plus",
    //     "libraryDirectory": "src/components"
    //   },
    //   "view-ui-plus"
    // ]
  ]
}
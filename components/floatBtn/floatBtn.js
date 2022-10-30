// components/WCH/w-to-top-btn/w-to-top-btn.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    route: {
      type: String,
      default: ''
    }
  },
  methods: {
    addNotice() {
      wx.navigateTo({
        url: this.properties.route,
      })
    }
  }
})

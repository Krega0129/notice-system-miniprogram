// components/profileOption/profileOption.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: {

  },
  methods: {
    toPage() {
      wx.navigateTo({
        url: this.properties.option.route,
      })
    }
  }
})

import VueCharts from '~/../node_modules/vue-charts/src/components/chart.js'

export default Object.assign(VueCharts, {
  watch: {
    options() {
      if (this.wrapper) {
        this.wrapper.setOptions(this.options)
      }
    }
  },
  created() {
    this.$on('redrawChart', function() {
      if(this.chart){
        this.drawChart()
      }
    })
  },

});

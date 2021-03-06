// See issue https://github.com/haydenbbickerton/vue-charts/issues/17

import Chart from 'vue-charts/src/components/chart'

export default Object.assign(Chart, {
  watch: {
    options() {
      if (this.wrapper) {
        this.wrapper.setOptions(this.options)
      }
    }
  }
});
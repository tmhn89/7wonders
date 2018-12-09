<template>
  <div class="science-calculator">
    Science
    <v-text-field prepend-icon="fa-drafting-compass" type="number" min="0" v-model="compass"></v-text-field>
    <v-text-field prepend-icon="fa-cog" type="number" min="0" v-model="gear"></v-text-field>
    <v-text-field prepend-icon="fa-mobile" type="number" min="0" v-model="tablet"></v-text-field>
    <v-text-field prepend-icon="fa-question" type="number" min="0" v-model="wild"></v-text-field>

    <v-text-field prepend-icon="fa-equals" :disabled="true" :value="isNaN(result) ? '...' : result"></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'ScienceCalculator',
  props: {

  },
  data: function () {
    return {
      compass: 2,
      gear: 2,
      tablet: 2,
      wild: 0
    }
  },
  computed: {
    result () {
      // get all possibilites by trying to converting wild card into other symbols
      let possibilities = this.convertWildcard()
      let scores = possibilities.map(this.getScore)
      return Math.max(...scores)
    }
  },
  methods: {
    /**
     * list all combination possible when converting wild card into other symbol.
     */
    convertWildcard () {
      let possibilities = [
        {
          compass: parseInt(this.compass),
          gear: parseInt(this.gear),
          tablet: parseInt(this.tablet)
        }
      ]

      let w = this.wild
      while (w > 0) {
        let newSet = []
        possibilities.forEach(combination => {
          newSet.push({
            compass: combination.compass + 1,
            gear: combination.gear,
            tablet: combination.tablet
          })

          newSet.push({
            compass: combination.compass,
            gear: combination.gear + 1,
            tablet: combination.tablet
          })

          newSet.push({
            compass: combination.compass,
            gear: combination.gear,
            tablet: combination.tablet + 1
          })
        })
        possibilities = newSet
        w--
      }

      return possibilities
    },
    /**
     * Get score of a science card set combination
     * @param {Object} combination includes the number of each symbol
     */
    getScore (combination) {
      let c = combination.compass
      let g = combination.gear
      let t = combination.tablet

      // each symbol set worth square of the symbol's number
      let compassPoint = c * c
      let gearPoint = g * g
      let tabletPoint = t * t

      // every set of a compass, gear and tablet worth 7 pts
      let setPoint = Math.min(c, g, t) * 7

      return gearPoint + tabletPoint + compassPoint + setPoint
    }
  }
}
</script>

<style lang="scss" scoped>
  .science-calculator {
    position: fixed;
    top: 64px;
    right: 64px;
  }
</style>

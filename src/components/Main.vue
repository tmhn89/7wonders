<template>
  <div class="scoreboard-wrapper">
    <table class="scoresheet">
      <thead class="header">
        <tr class="scoresheet__row">
          <th class="scoresheet__cell scoresheet__cell--player-name"></th>
          <th v-for="player in players" :key="player.id"
              class="scoresheet__cell scoresheet__cell--player-name">
            <input type="text" v-model="player.name" class="header__namebox"/>
          </th>
          <th v-if="players.length < 8"><a @click="addPlayer" class="button--add-player">+ Add player</a></th>
        </tr>
      </thead>
      <tbody class="scoresheet">
        <tr v-for="scoreType in Object.keys(defaultScore)" :key="scoreType"
            :class="`scoresheet__row scoresheet__row--${scoreType}`">
          <td class="scoresheet__cell scoresheet__cell--first">
            <span v-if="scoreType === 'armada'">
              <img :src="getImgSrc('naval')" class="icon--score-type"/>
              <img :src="getImgSrc('islands')" class="icon--score-type"/>
            </span>
            <span v-else-if="hasIconHeader.indexOf(scoreType) > -1">
              <img :src="getImgSrc(scoreType)" class="icon--score-type"/>
            </span>
            <span v-else>
              <div class="icon--score-type icon--card"></div>
            </span>
          </td>
          <td v-for="(player, index) in players" :key="player.id"
              class="scoresheet__cell" :class="{'scoresheet__cell--even': (index + 1) % 2 === 0}">
            <input type="text" v-model="scoreBoard[player.id].score[scoreType]"
                   class="scoresheet__scorebox"
                   :player="player.id"
                   :score-type="scoreType"
                   @focus="selectAllText"
                   @input="updateScore"/>
            <v-icon v-if="scoreType === 'science'"
                    class="button--science-help">help_outline</v-icon>
          </td>
        </tr>
        <tr class="scoresheet__row scoresheet__row--total">
          <td class="scoresheet__cell scoresheet__cell--first">Σ</td>
          <td v-for="(player, index) in players" :key="player.id"
              class="scoresheet__cell" :class="{'scoresheet__cell--even': (index + 1) % 2 === 0}">
            <animated-num :value="scoreBoard[player.id].total || 0"></animated-num>
          </td>
        </tr>
      </tbody>
    </table>
    <science-calculator>
    </science-calculator>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'

import AnimatedNum from '@/components/AnimatedNum'
import ScienceCalculator from '@/components/ScienceCalculator'

export default {
  name: 'Main',
  components: { AnimatedNum, ScienceCalculator },
  data () {
    return {
      games: [],
      players: [
        {
          name: 'Mew',
          id: uuidv4()
        },
        {
          name: 'Woof',
          id: uuidv4()
        }
      ],
      defaultScore: {
        military: 0,
        treasury: 0,
        wonder: 0,
        civilian: 0,
        commercial: 0,
        guilds: 0,
        science: 0,
        leader: 0,
        city: 0,
        armada: 0
      },
      scoreBoard: [],
      hasIconHeader: [ 'treasury', 'wonder', 'leader', 'armada' ]
    }
  },
  methods: {
    /**
     * Generate scoreboard object after fetching data
     */
    generateScoreBoard () {
      // merge player id, name and each score together for a line in the visual score board
      // temporary clone default score
      this.scoreBoard = {}
      this.players.forEach(player => {
        this.scoreBoard[player.id] = {
          name: player.name,
          total: 0
        }
        this.scoreBoard[player.id].score = Object.assign({}, this.defaultScore)
      })
    },
    updateScore (event) {
      let playerId = event.target.getAttribute('player')
      let scoreType = event.target.getAttribute('score-type')
      this.scoreBoard[playerId].score[scoreType] = event.target.value
      this.scoreBoard[playerId].total = this.getPlayerSumScore(playerId)
      this.$forceUpdate()
    },
    getPlayerSumScore (playerId) {
      let playerScore = this.scoreBoard[playerId].score
      let sum = 0
      Object.keys(this.defaultScore).forEach(scoreType => {
        sum += parseInt(playerScore[scoreType])
      })
      return sum
    },
    addPlayer () {
      let newPlayerId = uuidv4()
      let newPlayerName = `Player ${this.players.length + 1}`

      this.players.push({
        id: newPlayerId,
        name: newPlayerName
      })

      this.scoreBoard[newPlayerId] = {
        name: newPlayerName,
        total: 0,
        score: Object.assign({}, this.defaultScore)
      }

      this.$forceUpdate()
    },
    selectAllText (event) {
      event.target.setSelectionRange(0, event.target.value.length)
    },
    getImgSrc (iconName) {
      let images = require.context('../assets/', false, /\.svg$/)
      return images(`./icon-${iconName}.svg`)
    }
  },
  created () {
    this.generateScoreBoard()
  }
}
</script>

<style lang="scss" scoped>
  $color-military: #aa191b;
  $color-treasury: #fed766;
  $color-wonder: #d7a671;
  $color-civilian: #02669b;
  $color-commercial: #fdca07;
  $color-guilds: #744fa0;
  $color-science: #00994f;
  $color-black: #231f20;
  $color-white: #fff;

  $font-size: 20px;
  $column-width-max: 108px;

  .scoreboard-wrapper {
    display: inline-block;
    // margin: 0 auto;
  }

  .scoresheet {
    border-collapse: collapse;
    height: 100vh;
  }

  .scoresheet__cell {
    padding: 0;
    font-size: $font-size;
    text-align: center;
    max-width: $column-width-max;
    position: relative;
  }

  .scoresheet__cell--player-name {
    border-bottom: 4px double $color-black;
  }

  .header__namebox,
  .scoresheet__scorebox {
    border: none;
    text-align: center;
    outline: none;
    background: transparent;
    font-size: $font-size;
    max-width: $column-width-max;
  }

  .header__namebox {
    font-weight: 500;
    padding: 12px 0;
  }

  .button--add-player {
    cursor: pointer;
  }

  @mixin row-color ($color) {
    background: rgba($color, .2);

    .scoresheet__cell--even .scoresheet__scorebox {
      background: rgba($color-black, .1);
      width: 100%;
      height: 100%;
    }

    .scoresheet__cell--first {
      background: rgba($color, .75);

      .icon--card {
        background: $color;
      }
    }
  }

  .scoresheet__row--military {
    @include row-color($color-military);
  }

  .scoresheet__row--treasury {
    @include row-color($color-treasury);
  }

  .scoresheet__row--civilian {
    @include row-color($color-civilian);
  }

  .scoresheet__row--commercial {
    @include row-color($color-commercial);
  }

  .scoresheet__row--wonder {
    @include row-color($color-wonder);
  }

  .scoresheet__row--guilds {
    @include row-color($color-guilds);
  }

  .scoresheet__row--science {
    @include row-color($color-science);
  }

  .scoresheet__row--leader {
    @include row-color($color-white);
  }

  .scoresheet__row--armada {
    @include row-color($color-civilian);

    .scoresheet__cell--first {
      background-color: #fff;
    }
  }

  .scoresheet__row--city {
    @include row-color($color-black);
    background: rgba($color-black, .1);
  }

  .scoresheet__row--total {
    background: rgba($color-black, .2);
    border-top: 4px double $color-black;

    .scoresheet__cell {
      font-size: $font-size * 1.25;
      font-weight: 600;
    }

    .scoresheet__cell--first {
      background: $color-black;
      color: #fff;
      font-size: 36px;
    }

    .scoresheet__cell--even {
      background: rgba($color-black, .25);
    }
  }

  .icon--score-type {
    height: 48px;
  }

  .icon--card {
    border: 2px solid #fff;
    width: 28px;
    border-radius: 4px;
    margin: 0 auto;
  }

  .button--science-help {
    position: absolute;
    cursor: pointer;
    color: $color-science;
    right: 6px;
    bottom: 50%;
    transform: translateY(50%);
    opacity: 0;
    transition: 0.25s ease-in-out;
  }

  .scoresheet__cell:hover .button--science-help {
    opacity: 1;
  }

</style>

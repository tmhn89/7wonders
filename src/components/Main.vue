<template>
  <div>
    <table>
      <thead class="header">
        <tr class="scoresheet__row">
          <th></th>
          <th v-for="player in players" :key="player.id">
            <input type="text" v-model="player.name" class="header__namebox"/>
          </th>
          <th><a @click="addPlayer" class="button--add-player">+</a></th>
          <th><a @click="addPlayer" class="button--save">Save</a></th>
        </tr>
      </thead>
      <tbody class="scoresheet">
        <tr v-for="scoreType in Object.keys(defaultScore)" :key="scoreType" class="scoresheet__row">
          <td class="scoresheet__cell--first">{{ scoreType }}</td>
          <td v-for="player in players" :key="player.id" class="scoresheet__cell">
            <input type="text" v-model="scoreBoard[player.id].score[scoreType]"
              class="scoresheet__scorebox"
              :player="player.id"
              :score-type="scoreType"
              @focus="selectAllText"
              @input="updateScore"/>
          </td>
        </tr>
        <tr class="scoresheet__row scoresheet__row--total">
          <td class="scoresheet__cell scoresheet__cell--first">Total</td>
          <td v-for="player in players" :key="player.id" class="scoresheet__cell">
            {{ scoreBoard[player.id].total || 0 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'

export default {
  name: 'Main',
  data () {
    return {
      games: [],
      players: [
        {
          id: uuidv4(),
          name: 'Mew'
        },
        {
          id: uuidv4(),
          name: 'Woof'
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
        city: 0
      },
      scoreBoard: []
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
      let newPlayerName = 'Awoo'

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
    }
  },
  created () {
    this.generateScoreBoard()
  }
}
</script>

<style lang="scss" scoped>
 .header__namebox,
 .scoresheet__scorebox {
   border: none;
   text-align: center;
   outline: none;
 }

 .button--add-player {
   cursor: pointer;
 }
</style>

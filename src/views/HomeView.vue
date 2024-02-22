<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">Game</div>
        <div class="card-body">
          <div v-if="isEnd">
            <h3>
              Punctuation:
              <span class="p-2 mt-3 bg-dark text-white" style="width: 50%">{{
                points
              }}</span>
            </h3>
          </div>
          <div v-if="!isEnd">
            <h3>Punctuation: {{ points }}</h3>
          </div>
          <br />
          <br />
          <h3>Rest players: {{ lengthPlayers }}</h3>
          <hr />
          <div class="mb-3 row">
            <label for="name" class="col-sm-3 col-form-label"
              >Current Player</label
            >
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="player.name"
                disabled
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="name" class="col-sm-3 col-form-label"
              >Select the team</label
            >
            <div class="col-sm-4">
              <select
                v-if="isEnd"
                v-model="player.team"
                disabled
                class="form-select mb-3"
              >
                <option>Choose Team</option>
                <option
                  v-for="team in this.teams"
                  :value="team.name"
                  :key="team.id"
                >
                  {{ team.name }}
                </option>
              </select>

              <select
                v-if="!isEnd"
                v-model="player.team"
                class="form-select mb-3"
              >
                <option>Choose Team</option>
                <option
                  v-for="team in this.teams"
                  :value="team.name"
                  :key="team.id"
                >
                  {{ team.name }}
                </option>
              </select>
            </div>
          </div>
          <hr />
          <button
            class="btn btn-sm btn-success"
            @click="this.validate()"
            v-if="!isEnd"
          >
            <i class="fa-solid fa-check"></i> Validate game
          </button>

          <div class="mb-3 row" v-if="isEnd">
            <div class="col-sm-5">
              <input
                type="text"
                class="form-control mt-3"
                id="name"
                v-model="player.end"
                disabled
              />
            </div>
            <div class="col-sm-6">
              <button class="btn btn-warning mt-3" @click="this.restart()">
                <i class="fa-solid fa-refresh"></i> Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mostrarAlerta } from "../functions";

export default {
  data() {
    return {
      player: {
        id: 0,
        name: null,
        team: "Choose Team",
        end: "End of the game",
        idTeam: null,
        position: null,
      },
      isLoading: false,
      isEnd: false,
      urlBase: "http://127.0.0.1:8000/api/game/ajax-random-players",
      urlBaseTeams: "http://127.0.0.1:8000/api/teams",
      teams: [],
      players: [],
      points: 0,
      quantityPlayers: 0,
      cont: 0,
      teamBelong: "",
    };
  },
  mounted() {
    this.getPlayers();
    this.getTeams();
  },
  methods: {
    getTeams() {
      this.isLoading = true;
      axios
        .get(this.urlBaseTeams)
        .then((response) => {
          this.teams = response.data;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Error");
        });
    },
    getPlayers() {
      this.isLoading = true;
      axios
        .get(this.urlBase)
        .then((response) => {
          this.players = response.data;
          this.teamBelong = this.players[0].team;
          this.player.name = this.players[0].name;
          this.quantityPlayers = this.players.length;

          this.isLoading = false;
        })
        .catch(() => {
          console.log("Error");
        });
    },
    validate() {
      if (this.player.team === "Choose Team") {
        mostrarAlerta("Into the team", "warning");
      } else {
        if (this.cont <= 9) {
          this.teamBelong === this.player.team ? this.points++ : this.points--;
          this.quantityPlayers--;
          this.player.name = this.players[this.cont].name;
          this.teamBelong = this.players[this.cont].team;
          this.cont++;
        }
        if (this.cont == 10) {
          this.isEnd = true;
          this.player.name = "...";
          this.player.team = "";
        }
      }
    },
    restart() {
      this.getPlayers();
      this.getTeams();
      this.cont = 0;
      this.points = 0;
      this.isEnd = false;
      this.player.team = "Choose Team";
    },
  },
  computed: {
    lengthPlayers() {
      return this.quantityPlayers;
    },
    pointsPlayers() {
      return this.points;
    },
    countPlayers() {
      return this.cont;
    },
  },
};
</script>

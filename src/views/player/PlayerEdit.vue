<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Edit Player
        </div>
        <div class="card-body">
          <form @submit.prevent="edit">
            <div class="mb-3 row">
              <label for="name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="player.name"
                  required
                  maxlength="50"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="name" class="col-sm-2 col-form-label">Position</label>
              <div class="col-sm-6">
                <select
                  class="form-select mb-3"
                  @change="selectPosition($event)"
                >
                  <option selected>Choose position</option>
                  <option value="midfield">midfield</option>
                  <option value="goalkeeper">goalkeeper</option>
                  <option value="defender">defender</option>
                  <option value="forward">forward</option>
                </select>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="name" class="col-sm-2 col-form-label">Team</label>
              <div class="col-sm-6">
                <select class="form-select mb-3" @change="selectTeam($event)">
                  <!-- <option selected>Choose team</option> -->
                  <!-- <option v-if="!teamsLoaded" disabled>Loading...</option> -->
                  <option selected value="{{player.idTeam}}">
                    {{ player.team }}
                  </option>
                  <option
                    value="{{ item.id }}"
                    v-for="item in this.teams"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-sm btn-warning">
              <i class="fa-solid fa-refresh"> </i> Update
            </button>
          </form>
          <hr />
          <button
            class="btn btn-sm btn-danger"
            v-on:click="this.deletePlayer(this.player.id, this.player.name)"
          >
            <i class="fa-solid fa-trash"></i> Delete
          </button>
          <hr />
          <router-link :to="{ path: '/listP' }" class="btn btn-sm btn-primary"
            ><i class="fa-solid fa-arrow-left"></i> Back to list</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import {
  enviarSolicitudUpdate,
  mostrarAlerta,
  confirmar,
} from "../../functions";

export default {
  data() {
    return {
      player: {
        id: 0,
        name: null,
        team: null,
        idTeam: null,
        position: null,
      },
      isLoading: false,
      urlGetTeam: "",
      urlEdit: "",
      urlDelete: "",
      urlBase: "http://127.0.0.1:8000/api/players",
      urlBaseTeams: "http://127.0.0.1:8000/api/teams",
      path: "/listP",
      teams: null,
    };
  },
  mounted() {
    const route = useRoute();
    this.player.id = route.params.id;
    this.urlGetPlayer = this.urlBase + "/" + this.player.id;
    this.urlDelete = this.urlBase + "/" + this.player.id;
    this.urlEdit = `${this.urlBase}/${this.player.id}/edit`;
    this.getPlayer();
    this.getTeams();
  },
  methods: {
    getPlayer() {
      axios.get(this.urlGetPlayer).then((response) => {
        this.player.name = response.data.data.name;
        this.player.position = response.data.data.position;
        this.player.team = response.data.data.team;
        this.player.idTeam = response.data.data.id_team;
      });
    },
    edit() {
      if (this.player.name.trim() === "") {
        mostrarAlerta("Into the name", "warning");
      }
      if (this.player.position === null) {
        mostrarAlerta("Into the position", "warning");
      }
      if (this.player.team === null) {
        mostrarAlerta("Into the team", "warning");
      } else {
        enviarSolicitudUpdate(
          this.team,
          "Player edit successfully!!!",
          this.urlEdit,
          this.path
        );
      }
    },
    deletePlayer(id, name) {
      confirmar(
        id,
        "Delete Player",
        `¿Are you sure delete player ${name}?`,
        this.urlDelete,
        this.path
      );
      this.isLoading = false;
    },
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
    selectPosition(event) {
      this.position = event.target.value;
      console.log(event.target.value);
    },
    selectTeam(event) {
      this.team = event.target.value;
      console.log(event.target.value);
    },
  },
};
</script>

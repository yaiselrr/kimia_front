<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Create new Player
        </div>
        <div class="card-body">
          <form @submit.prevent="create">
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
                <select v-model="player.position" class="form-select mb-3">
                  <option>Choose Position</option>
                  <option
                    v-for="position in this.positions"
                    :value="position.name"
                    :key="position.id"
                  >
                    {{ position.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="name" class="col-sm-2 col-form-label">Team</label>
              <div class="col-sm-6">
                <select v-model="player.team" class="form-select mb-3">
                  <option>Choose Team</option>
                  <option
                    v-for="team in this.teams"
                    :value="team.id"
                    :key="team.id"
                  >
                    {{ team.name }}
                  </option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-success">
              <i class="fa-solid fa-save"> </i> Save
            </button>
          </form>
          <hr />
          <router-link :to="{ path: '/listP' }" class="btn btn-primary"
            ><i class="fa-solid fa-arrow-left"></i> Back to list</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { enviarSolicitudCreate, mostrarAlerta } from "../../functions";
import axios from "axios";

export default {
  data() {
    return {
      player: {
        name: null,
        team: "Choose Team",
        position: "Choose Position",
      },
      isLoading: false,
      isActive: true,
      urlAdd: "/new",
      urlBase: "http://127.0.0.1:8000/api/players",
      urlBaseTeams: "http://127.0.0.1:8000/api/teams",
      urlBasePositions: "http://127.0.0.1:8000/api/positions",
      teams: [],
      positions: [],
      path: "listT/",
    };
  },
  mounted() {
    this.getTeams();
    this.getPositions();
  },
  methods: {
    create() {
      if (this.player.name.trim() === "") {
        mostrarAlerta("Into the name", "warning");
      }
      if (this.player.position === "Choose Position") {
        mostrarAlerta("Into the position", "warning");
      }
      if (this.player.team === "Choose Team") {
        mostrarAlerta("Into the team", "warning");
      }
      if (
        this.player.name.trim() !== "" &&
        this.player.position !== "Choose Position" &&
        this.player.team !== "Choose Team"
      ) {
        enviarSolicitudCreate(
          this.player,
          "Player add successfully!!!",
          this.urlBase + this.urlAdd,
          this.path
        );
      }
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
    getPositions() {
      this.isLoading = true;
      axios
        .get(this.urlBasePositions)
        .then((response) => {
          this.positions = response.data;
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

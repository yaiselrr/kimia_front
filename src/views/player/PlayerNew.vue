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
                  <option selected>Choose team</option>
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
        position: null,
        team: null,
      },
      isLoading: false,
      urlAdd: "/new",
      urlBase: "http://127.0.0.1:8000/api/players",
      urlBaseTeams: "http://127.0.0.1:8000/api/teams",
      teams: null,
      path: "listT/",
    };
  },
  mounted() {
    this.getTeams();
  },
  methods: {
    create() {
      if (this.player.name.trim() === "") {
        mostrarAlerta("Into the name", "warning");
      }
      if (this.player.position === null) {
        mostrarAlerta("Into the position", "warning");
      }
      if (this.player.team === null) {
        mostrarAlerta("Into the team", "warning");
      } else {
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

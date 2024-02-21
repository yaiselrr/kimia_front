<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">Edit Team</div>
        <div class="card-body">
          <form @submit.prevent="edit">
            <div class="mb-3 row">
              <label for="name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="team.name"
                  required
                  maxlength="50"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="color" class="col-sm-2 col-form-label">Color</label>
              <div class="col-sm-6">
                <input
                  type="color"
                  class="form-control form-control-color w-80"
                  id="exampleColorInput"
                  value="#563d7c"
                  title="Choose your color"
                  v-model="team.color"
                />
              </div>
            </div>
            <button type="submit" class="btn btn-sm btn-warning">
              <i class="fa-solid fa-refresh"> </i> Update
            </button>
          </form>
          <hr />
          <button
            class="btn btn-sm btn-danger"
            v-on:click="this.deleteTeam(this.team.id, this.team.name)"
          >
            <i class="fa-solid fa-trash"></i> Delete
          </button>
          <hr />
          <router-link :to="{ path: '/listT' }" class="btn btn-sm btn-primary"
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
      team: {
        id: 0,
        name: null,
        color: null,
      },
      isLoading: false,
      urlGetTeam: "",
      urlEdit: "",
      urlDelete: "",
      urlBase: "http://127.0.0.1:8000/api/teams",
      path:'/listT'
    };
  },
  mounted() {
    const route = useRoute();
    this.team.id = route.params.id;
    this.urlGetTeam = this.urlBase + "/" + this.team.id;
    this.urlDelete = this.urlBase + "/" + this.team.id;
    this.urlEdit = `${this.urlBase}/${this.team.id}/edit`;
    this.getTeam();
  },
  methods: {
    getTeam() {
      axios.get(this.urlGetTeam).then((response) => {
        this.team.name = response.data.name;
        this.team.color = response.data.color;
      });
    },
    edit() {
      if (this.team.name.trim() === "") {
        mostrarAlerta("Into the name", "warning");
      } else {
        enviarSolicitudUpdate(
          this.team,
          "Team edit successfully!!!",
          this.urlEdit,
          this.path
        );
      }
    },
    deleteTeam(teamId, name) {
      confirmar(
        teamId,
        "Delete Team",
        `¿Are you sure delete team ${name}?`,
        this.urlDelete,
        this.path
      );
      this.isLoading = false;
    },
  },
};
</script>

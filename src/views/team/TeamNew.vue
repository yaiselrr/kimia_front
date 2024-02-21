<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Create new Team
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
            <button type="submit" class="btn btn-success">
              <i class="fa-solid fa-save"> </i> Save
            </button>
          </form>
          <hr />
          <router-link :to="{path:'/listT'}" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Back to list</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  enviarSolicitudCreate,
  mostrarAlerta
} from "../../functions";
export default {
  data() {
    return {
      team: {
        name: null,
        color: "#563d7c",
      },
      isLoading: false,
      urlAdd: "/new",
      urlBase: "http://127.0.0.1:8000/api/teams",
      path : 'listT/'
    };
  },
  methods: {
    create() {
      if (this.team.name.trim() === "") {
        mostrarAlerta("Ingrese el nombre", "warning");
      } else {
        enviarSolicitudCreate(
          this.team,
          "Team add successfully!!!",
          this.urlBase + this.urlAdd,
          this.path
        );
      }
    }
  },
};
</script>

<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>POSITION</th>
              <th>TEAM</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-if="this.isLoading">
              <td colspan="6"><h3>Loading...</h3></td>
            </tr>
            <tr v-else v-for="(item, i) in this.players" :key="item.id">
              <td v-text="i + 1"></td>
              <td v-text="item.name"></td>
              <td v-text="item.position"></td>
              <td v-text="item.team"></td>
              <td width="40%" align="right">
                <!-- <router-link
                  :to="{ path: 'view/' + item.id }"
                  class="btn btn-sm btn-primary mr-2"
                >
                  <i class="fa-solid fa-eye"></i>
                </router-link>
                &nbsp; -->
                <router-link
                  :to="{ path: 'edit/' + item.id }"
                  class="btn btn-sm btn-warning mr-2"
                >
                  <i class="fa-solid fa-edit"></i>
                </router-link>
                &nbsp;
                <!-- <button
                  class="btn btn-sm btn-danger"
                  v-on:click="this.deleteTeam(item.id, item.name)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { confirmar } from "../../functions";
export default {
  data() {
    return {
      players: null,
      isLoading: false,
    };
  },
  mounted() {
    this.getPlayers();
  },
  methods: {
    getPlayers() {
      this.isLoading = true;
      let url = "http://127.0.0.1:8000/api/players";
      axios
        .get(url)
        .then((response) => {
          this.players = response.data;
          console.log(this.players);
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Error");
        });
    },
    deleteTeam(teamId, name) {
      confirmar(teamId, "Eliminar jugador",`¿Está seguro de eliminar el jugador ${name}?`,"http://127.0.0.1:8000/api/players/");
      this.isLoading = false;
    },
  },
};
</script>

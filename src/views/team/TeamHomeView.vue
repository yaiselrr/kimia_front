<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-if="this.isLoading">
              <td colspan="6"><h3>Loading...</h3></td>
            </tr>
            <tr v-else v-for="(item, i) in this.teams" :key="item.id">
              <td v-text="i + 1"></td>
              <td v-text="item.name"></td>
              <td width="40%" align="right">
                <router-link
                  :to="{ path: 'editT/' + item.id }"
                  class="btn btn-sm btn-warning mr-2"
                >
                  <i class="fa-solid fa-edit"></i>
                </router-link>
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

export default {
  data() {
    return {
      teams: null,
      isLoading: false,
      urlBase: "http://127.0.0.1:8000/api/teams"
    };
  },
  mounted() {
    this.getTeams();
  },
  methods: {
    getTeams() {
      this.isLoading = true;
      axios
        .get(this.urlBase)
        .then((response) => {
          this.teams = response.data;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Error");
        });
    }
  },
};
</script>

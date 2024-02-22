<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success mb-5">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">KIMIA</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <!-- <li class="nav-item">
            <router-link class="nav-link active" to="/">Game</router-link>
          </li>           -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Team
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/listT">List Teams</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/createT">New Team</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Player
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/listP">List Players</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/createP">New Player</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Game</router-link>
          </li> 
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

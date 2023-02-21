<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import Home from "../pages/Home.svelte";
  import Login from "../pages/Login.svelte";
  import Register from "../pages/Register.svelte";
  import UserList from "../pages/UserList.svelte";
  const routes = {
    "/": Home,
    "/login": Login,
    "/register": Register,
    "/userList": UserList,
  };
</script>

<Router {routes} />

<div id="navbar" class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">
      <button on:click={async () => await push("/")}
        >Account Creatooooor
      </button></a
    >
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-bordered" />
    </div>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar"> Menu </label>
      <ul
        tabindex="0"
        class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a class="justify-between">
            <button on:click={async () => await push("/")}>Home </button>
          
          </a>

        </li>
        <li><a>  <button on:click={async () => await push("/login")}>Login/ Register </button>
          <span class="badge">New</span></a></li>
     
        <li>
          <a
            >   <button on:click={async () => await push("/userList")}>Userlist</button></a
          >
        </li>
        <li><a>Logout <span class="badge">Coming Soon!</span></a></li>
      </ul>
    </div>
  </div>
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  #navbar {
    border: 1px solid black;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

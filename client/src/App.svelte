<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import UserList from "./pages/UserList.svelte";
  const routes = {
    "/": Home,
    "/login": Login,
    "/register": Register,
    "/userList": UserList
  };
  // import LoginForm from './components/LoginForm.svelte';
  import Navbar from './components/Navbar.svelte';
  //     import UserList from './components/UserList.svelte';

  //     import displayForm from './store/displayform';
  //     import DisplayUsers from './components/DisplayUsers.svelte';
  //     import { selectedUserName } from './store/selectedUser';
  //     import EditPreferences from './components/EditPreferences.svelte';
      import AlertMessage from './components/AlertMessage.svelte';
      import ErrorMessage from './components/ErrorMessage.svelte';
  //     import errorMessage from './store/errorMessage';
  //     import alertMessage from './store/alertMessage';
</script>
<Navbar/> 
<br>
<main>
  
 <ErrorMessage/>

<AlertMessage/>
  <footer>footer</footer>
</main>

<!-- <main>

<br>



<DisplayUsers/>
<br>
<br>
<br>
{#if $displayForm}

<LoginForm/>
{:else}
{#if $selectedUserName}
<EditPreferences/>
{:else}
<UserList/>{/if}
{/if}

</main> -->
<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

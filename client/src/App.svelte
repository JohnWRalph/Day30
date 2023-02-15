<script lang="ts">


import LoginForm from './components/LoginForm.svelte';
import Navbar from './components/Navbar.svelte';
    import UserList from './components/UserList.svelte';

    import displayForm from './store/displayform';
    import DisplayUsers from './components/DisplayUsers.svelte';
    import { selectedUserName } from './store/selectedUser';
    import EditPreferences from './components/EditPreferences.svelte';
    import AlertMessage from './components/AlertMessage.svelte';
    import ErrorMessage from './components/ErrorMessage.svelte';
    import errorMessage from './store/errorMessage';
    import alertMessage from './store/alertMessage';

    
    
</script>

<main>
<Navbar/>
<br>
{#if $errorMessage}
<ErrorMessage/>
{:else if $alertMessage}
<AlertMessage/>
{/if}

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

</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
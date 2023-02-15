<script lang="ts">

    import userList from "../store/userList";
import displayForm from "../store/displayform";
    import alertMessage from "../store/alertMessage";
    import errorMessage from "../store/errorMessage";
    

var displayUsersButtonText:boolean = true

async function displayUsers() {
    
    displayForm.set(!$displayForm)
    displayUsersButtonText = !displayUsersButtonText;
 errorMessage.set("")
    alertMessage.set("")
}
</script>

{#if displayUsersButtonText === true}
<div id="getUsersButton" class="form-control mt-6">
    <button  on:click={async () => await displayUsers()} class="btn btn-primary">Display All Existing Users</button>
  </div>
{:else}
<div id="getUsersButton" class="form-control mt-6">
    <button  on:click={async () => await displayUsers()} class="btn btn-primary">Back to Create User</button>
  </div>
{/if}
  <style global lang="postcss">
    
    #getUsersButton {
        border: 1px solid black;
    position:absolute;
    width:90%;
    top:50px;
    left:5%;
    }
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </style>
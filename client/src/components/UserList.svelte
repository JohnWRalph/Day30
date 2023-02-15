<script lang="ts">
    import axios from "axios";
    import alertMessage from "../store/alertMessage";
    import errorMessage from "../store/errorMessage";
    import {
        selectedUserEmail,
        selectedUserId,
        selectedUserName,
    } from "../store/selectedUser";
    // import userList from "../store/userList";
    let userList = [];
    let selectedUserIndex = -1;
    async function getAllUsers() {
        const result = await axios.get("http://localhost:3000/user", {});

        userList = result.data;
    
    }

    export async function changeUserPreferences(selectedUserIndex) {
     
        if (selectedUserIndex < 0) {
            errorMessage.set("No user selected.");
        } else {
            selectedUserName.set(userList[selectedUserIndex].user.username);
            selectedUserEmail.set(
                userList[selectedUserIndex].user.emailAddress
            );
            selectedUserId.set(userList[selectedUserIndex].user.userid);
            errorMessage.set("")
        }
    }
    getAllUsers();
</script>

<div id="userListContainer">
    <div id="getUsersButton" class="form-control mt-6">
        <button
            on:click={async () =>
                await changeUserPreferences(selectedUserIndex)}
            class="btn btn-primary">Change Selected User Preferences</button
        >
    </div>
    <br />
    <div id="userList" class="overflow-x-auto w-full">
        <table class="table w-full">
            <!-- head -->
            <thead>
                <tr>
                    <th />
                    <th>Username</th>
                    <th>Userid</th>
                    <th>Email</th>
                    <th />
                </tr>
            </thead>
            {#each userList as user, i}
                <tbody>
                    <!-- row 1 -->
                    <tr>
                        <th>
                            <label>
                                <input
                                    id={i.toString()}
                                    bind:group={selectedUserIndex}
                                    value={i}
                                    type="radio"
                                    name="radio-1"
                                    class="radio"
                                />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center space-x-3">
                                <div>
                                    <div class="font-bold">
                                        {user.user.username}<br />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td> {user.user.userid}</td>
                        <td>{user.user.emailAddress}</td>
                    </tr>
                </tbody>
            {/each}
            <!-- foot -->
            <tfoot>
                <tr>
                    <th />
                    <th>Username</th>
                    <th>Userid</th>
                    <th>Email</th>
                    <th />
                </tr>
            </tfoot>
        </table>
    </div>

    <br />
    <br />

    <!-- {#each $userList as user}
    {$userList}
    {/each} -->
    <!-- {#each $userList as user } -->
    <!-- {user}<br> -->
    <!-- {$userList[0].user.username}<br>
    {$userList[0].user.userid} 
{/each} -->
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    #userList {
        border-top: 1px solid white;
        border-right: 5px solid white;
        border-bottom: 5px solid white;
        border-left: 1px solid white;
        border-radius: 10px;
    }
    #userListcontainer {
        position: absolute;
        top: 500;
    }
</style>

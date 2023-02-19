<script lang="ts">
    import {
        selectedUserName,
        selectedUserEmail,
        selectedUserId,
    } from "../store/selectedUser";
    import axios from "axios";
    import alertMessage from "../store/alertMessage";
    import errorMessage from "../store/errorMessage";
    import loginToken from "../store/loginToken";

    let newUsername: string;
    let newEmailAddress: string;
    let newUser;
    let preferencesbutton = true;

    async function submitNewPreferences(newUsername, newEmailAddress) {
        console.log("login", loginToken);

        const result = await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/user/${$selectedUserId}`,
            {
                newUsername: newUsername,
                newEmailAddress: newEmailAddress,
            },
            {
                headers: { Authorization: "Bearer " + $loginToken },
            }
        );
        newUser = result.data;
        console.log(result);
        if (
            newUser.username === newUsername ||
            newUser.emailAddress === newEmailAddress
        ) {
            alertMessage.set("Preferences updated!");
            preferencesbutton = false;
            return;
        } else {
            errorMessage.set(result.data.error);
            return;
        }
    }

    async function clearSelected() {
        selectedUserName.set("");
        selectedUserEmail.set("");
        selectedUserId.set("");
        alertMessage.set("");
    }
</script>

{#if $selectedUserName}
    <div class="tableHeader">
        Select new preferences for: <br />
        {$selectedUserId}
    </div>
    <div id="preferences" class="overflow-x-auto">
        <table class="table table-zebra w-full">
            <!-- head -->
            <thead>
                <tr>
                    <th>Current</th>
                    <th>New</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr>
                    <td>{$selectedUserName}</td>
                    <td>
                        <input bind:value={newUsername} />
                    </td>
                </tr>
                <!-- row 2 -->
                <tr>
                    <td>{$selectedUserEmail}</td>
                    <td> <input bind:value={newEmailAddress} /></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="getUsersButton" class="form-control mt-6">
        <button
            disabled={!preferencesbutton}
            on:click={async () =>
                await submitNewPreferences(newUsername, newEmailAddress)}
            class="btn btn-primary">Submit new Preferences</button
        >
    </div>
    <div id="getUsersButton" class="form-control mt-6">
        <button
            on:click={async () => await clearSelected()}
            class="btn btn-primary">Go Back to all Users</button
        >
    </div>
{:else}{/if}

<style global lang="postcss">
    .tableHeader {
        color: black;
        font-weight: bold;
        background-color: rgb(182, 196, 212);
        border-top-right-radius: 10px;
    }
    #preferences {
        border: 1px solid rgb(182, 196, 212);
    }

    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

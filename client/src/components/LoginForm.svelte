<script lang="ts">
    import axios from "axios";
    import alertMessage from "../store/alertMessage";
    import errorMessage from "../store/errorMessage";

    let username: string;
    let emailAddress: string;

    async function submitNewUser() {
        const result = await axios.post(" http://localhost:3000/user", {
            username: username,
            emailAddress: emailAddress,
        });
        if (errorMessage) {
             errorMessage.set(result.data.error)
        } 
        
        // errorMessage.set(result.data.error);
      
        alertMessage.set(
            'Account Created! Check it out by clicking "Display all Existing Users!"'
        );
    }
</script>

<div id="loginForm" class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">
                Create an account! It's Easy! AND FUN!
            </h1>
            <p class="py-6">
                Enter a custom username and your email address to get started
                now!
            </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Username</span>
                    </label>
                    <input
                        bind:value={username}
                        type="text"
                        placeholder="Username"
                        class="input input-bordered"
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input
                        bind:value={emailAddress}
                        type="text"
                        placeholder="Email"
                        class="input input-bordered"
                    />
                    <!-- <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label> -->
                </div>
                <div class="form-control mt-6">
                    <button
                        on:click={async () => await submitNewUser()}
                        class="btn btn-primary">Create account</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<style global lang="postcss">
    #loginForm {
        margin-top: 50px;
    }
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

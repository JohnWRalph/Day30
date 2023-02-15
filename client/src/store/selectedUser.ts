import { writable } from "svelte/store";

const selectedUserName = writable<string>()
const selectedUserEmail = writable<string>()
const selectedUserId = writable<string>()

export {selectedUserEmail, selectedUserName, selectedUserId}
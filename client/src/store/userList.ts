import { writable } from "svelte/store";

const userList = writable<any[]>() 

export default userList
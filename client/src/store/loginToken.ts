import { writable } from "svelte/store";

const loginToken = writable<string>()

export default loginToken
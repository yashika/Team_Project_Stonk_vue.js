import axios from "axios";
import bus from '../utils/bus.js';

async function fetch(url, errorMessage) {
    bus.$emit("on:spinner");
    let data = {};
    try {
        data = await axios.get(url);
    } catch (error) {
        data = {
            error,
            message: `${errorMessage}... 잠시후에 다시시도해주세요`
        };
    }
    bus.$emit("off:spinner");
    return data;
}

function fetchItems() {
    return fetch(`/api/price`, "price load error");
}

async function fetchCommunity() {
    return fetch(`/api/post`, "community load error");
}

async function fetchPost(postid) {
    return fetch(`/api/post/${postid}`, "post info load error");
}

async function fetchUser(nickname) {
    return fetch(`/api/user/${nickname}`, "user info load error");
}

async function fetchDeletePost(postid) {
    try {
        return await axios.delete(`/api/post/${postid}`);
    } catch (error) {
        return error;
    }
}

async function fetchLogout() {
    return fetch(`api/auth/logout`, "logout error");
}

async function fetchSignOut(nickname) {
    try {
        return await axios.delete(`api/auth/signOut/${nickname}`);
    } catch (error) {
        console.log(error);
    }
}

export {
    fetchItems,
    fetchCommunity,
    fetchPost,
    fetchUser,
    fetchDeletePost,
    fetchLogout,
    fetchSignOut
}
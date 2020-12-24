import { LOGIN, LOGOUT, CHECK_AUTH } from './actions.type';
import { JwtService, saveToken } from '../common/jwt.service';
import ApiService from '../services/api.service';
import { SET_AUTH, SET_ERROR, PURGE_AUTH } from './mutation.type';
import Axios from 'axios'
import { config } from '../helpers/config';


const state = {
    error: null,
    user: {},
    isAuthenticated: !!localStorage.id_token
    // !!JwtService.geteToken()
}

const getters = {
    currentUser(state) {
        return state.user
    },
    isAuthenticated(state) {
        return state.isAuthenticated
    }
}

const actions = {
    [LOGIN](context, credentials) {
        return new Promise(resolve => {
            Axios.post(`${config.API_URL}auth/email/login`, credentials)
                .then(data => {
                    console.log(data)
                    saveToken(data.data.data.access_token)
                    context.commit(SET_AUTH, data.data.data.user),
                        resolve(data)
                })
        })
            .catch(({ response }) => {
                context.commit(SET_ERROR, response.data.errors);
            });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [CHECK_AUTH](context) {
        if (JwtService.getToken()) {
            ApiService.setHeader();
            ApiService.get("user")
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        } else {
            context.commit(PURGE_AUTH);
        }
    },
}
const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        JwtService.saveToken(state.user.token);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        JwtService.destroyToken();
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};

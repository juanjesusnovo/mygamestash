import { createStore } from "vuex"

import createPersistedState from "vuex-persistedstate"

export default createStore({
    state: {
        isLoged: false,
        currentUser: null,
        currentStash: null,
        currentId: null
    },
    plugins: [ createPersistedState() ],
    mutations: {
        setUser(state, user){
            state.currentUser = user
        },
        setStash(state, stash){
            state.currentStash = stash
        },
        addGame(state, game){
            let stash = state.currentStash
            const isAdded = state.currentStash.includes(game)
            isAdded ? (
                stash = state.currentStash.filter(gameId => gameId !== game)
            ) : (
                stash = [
                    ...stash,
                    game
                ]
            )
            state.currentStash = stash
        },
        setLogout(state){
            state.currentUser = null
            state.currentStash = null
            state.currentId = null
        },
        setLoged(state, loged){
            state.isLoged = loged
        },
        setId(state,id){
            state.currentId = id
        }
    }
})
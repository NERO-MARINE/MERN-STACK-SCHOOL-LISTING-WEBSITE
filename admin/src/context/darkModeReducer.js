const DarkModeReducer = (state, action)=>{
    switch(action.type){
        case "LIGHT":{
            return{
                darkMode: false,
            }
        }

        case "DARK":{
            return{
                darkMode: true,
            }
        }

        case "TOGGLE":{
            return{
                // this will use the darkmode state i.e(if the current state is true, then "toggle action" will make it false and vice-versa)
                darkMode: !state.darkMode
            }
        }

        default:
            return state;
    }
}

export default DarkModeReducer;
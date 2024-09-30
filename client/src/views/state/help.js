/*
1) in sore.js file    
import stateReducer from '../views/state/StateRedux' // import the state
    
    export const store = configureStore({
  reducer: {
     ......
    state: stateReducer, // add the state here
    
  },
})


2) in LayoutRouting.jsx

import StateList from './views/state/StateList'
import StateDetail from './views/state/StateDetails'

<Route path='state' element={<StateList/>}/>
<Route path='state/:id' element={<StateDetail/>}/>


3) in Sidebar.jsx (optional)

    await authService.checkPermmision(state, 'read'))&&getItem(State,state,<DashboardOutlined/>),
    
    and change the icon


4) back end index.js

const statRoute = require('./state/statRouter');

{
    path: '/state',
    route: statRoute,
  },

*/
    

    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
    import StateService from './StateService';


    export const searchState = createAsyncThunk(
        "state/searchState",
        async (data, { rejectWithValue,getState }) => {
        try {
            
            const { searchText,page,limit,sort,order } = getState().state.query; // Access state directly

            const res = await StateService.searchStat({page,limit,searchText,sort,order});
            
    
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
        }
    );

    export const stateSlice = createSlice({
    name: 'state',
    initialState:{
        query:{
            searchText:'',
            page:1,
            limit:5,
            sort:'',
            order:''
        }
    },
    reducers: {
        updateStateState: (state,action) => {
        
        state.query = {...state.query,...action.payload}

        },
        
        
    },

    })

    export const { updateStateState } = stateSlice.actions

    export default stateSlice.reducer
    export const stateSearchText = (state) => state.state.query.searchText;
    export const statePage = (state)=>state.state.query.page
    export const stateLimit = (state)=>state.state.query.limit
    export const stateSort = (state)=>state.state.query.sort
    export const stateQuery = (state)=>state.state.query


    
    
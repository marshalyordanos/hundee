
    
import api from '../../api/api';

class StateService {
    createStat(data) {
        return api
            .post("/state", data)
            .then(response => {
                return response.data.data;
            });
    }

    updateStat(data, id) {
        return api
            .patch("/state/" + id, data)
            .then(response => {
                return response.data.data;
            });
    }

    searchStat({page, limit,searchText=null,sort=null,order}) {
        let url = `/state?page=${page}&limit=${limit}`
        if(sort){
    const sortValue = order == 'ascend' ? sort : order == 'descend' ? '-'+sort:'';
            url = url + `&sort=${sortValue}`
        }

        if(searchText){
           
            url = url + `&searchText=${searchText}`
        }

        return api
            .get(url)
            .then(response => {
                return {data:response.data.data,total:response.data.total};
            });
    }

    getStat(id) {
        return api
            .get("/state/" + id)
            .then(response => {
                return response.data.data;
            });
    }


    deleteStat( id) {
        return api
            .delete("/state/" + id)
            .then(response => {
                return response.data.data;
            });
    }

    stateDo({method,payload}){
        return api
            .post("/state/do",{method,payload})
            .then(response => {
                return response.data.data;
            });
    }

    statDo({method,payload,id}){
        return api
            .post("/state/do/"+id,{method,payload})
            .then(response => {
                return response.data.data;
            });
    }
}

export default new StateService();

    
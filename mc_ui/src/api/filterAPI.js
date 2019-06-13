class FilterAPI {

    static async search(keyword, cmp) {
        let req = {
            'keyword': keyword
        };
        await fetch('http://localhost:8080/filter/search', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            if (jsonResult.status === 'Success') {
                cmp.data = jsonResult.result.data;
                cmp.count = jsonResult.result.count;
            }
            else {
                cmp.error = jsonResult.message;
            }
        }).catch((error) => {
            cmp.error = error;
        });
        cmp.setState({});
    }

    static async findDefault(cmp) {
        await fetch('http://localhost:8080/filter/findDefault', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            if(jsonResult.status === 'Success') {
                cmp.data = jsonResult.result.data;
            }
            else {
                cmp.error = jsonResult.message;
            }
        }).catch((error) => {
            cmp.error = error;
        });
        cmp.setState({});
    }

    static async create(name, filter, cmp) {
        if(filter[0] === '') {
            filter.shift();
        }
        let req = {
            "name": name,
            "filter": filter.join(',') 
        };
        await fetch('http://localhost:8080/filter/', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.error = jsonResult.status === 'Success' ? '' : jsonResult.message;
        }).catch((error) => {
            cmp.error = error;
        });
        cmp.setState({});
    }

    static async remove(id, cmp) {
        await fetch('http://localhost:8080/filter/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.error = jsonResult.status === 'Success' ? '' : jsonResult.message;
        }).catch((error) => {
            cmp.error = error;
        });
        cmp.setState({});
        FilterAPI.search('', cmp);
    }

    static async edit(id, isDefault, name, filter, cmp) {
        let req = {
            "name": name,
            "filter": filter.join(',') 
        };
        await fetch('http://localhost:8080/filter/' + id + '/' + isDefault, {
            method: 'put',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.error = jsonResult.status === 'Success' ? '' : jsonResult.message;
        }).catch((error) => {
            cmp.error = error;
        });
        cmp.setState({});
    }

}

export { FilterAPI }
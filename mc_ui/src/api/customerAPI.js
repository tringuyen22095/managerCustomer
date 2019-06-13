class CustomerAPI {

    static async getById(id, cmp) {
        await fetch('http://localhost:8080/customer/' + parseInt(id), {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.data = jsonResult.result.data;
            cmp.data.dob = Date.parse(cmp.data.dob);
            cmp.error = jsonResult.status === 'Success' ? '' : jsonResult.message;     
        }).catch((error) => {
            cmp.error = error
        });
        cmp.setState({});
    }

    static async searchByKeyword(cmp) {
        let filter = cmp.filter !== '' ? cmp.filter.split(',').map(i => i.split(' ').join('_')) : [];
        let req = {
            "keyword": cmp.searchText ? cmp.searchText : '',
            "page": cmp.page,
            "show": cmp.show,
            "dFrom": cmp.dFrom ? Date.parse(cmp.dFrom) : null,
            "dTo": cmp.dTo ? Date.parse(cmp.dTo) : null,
            "filter": filter
        };
        await fetch('http://localhost:8080/customer/search', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.data = jsonResult.result.data;
            cmp.total = jsonResult.result.data.length;
            cmp.page = jsonResult.result.page;
            cmp.total = jsonResult.result.totalRecord;
            cmp.error = jsonResult.status === 'Success' ? '' : jsonResult.message;
        }).catch((error) => {
            cmp.error = error;
            cmp.date = [];
        });
        cmp.setState({});
    }

    static async create(req, cmp) {
        await fetch('http://localhost:8080/customer/', {
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

    static async edit(id, req, cmp) {
        await fetch('http://localhost:8080/customer/' + parseInt(id), {
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

    static async remove(id, cmp) {
        await fetch('http://localhost:8080/customer/' + parseInt(id), {
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
            cmp.error = error
        });
        CustomerAPI.searchByKeyword(cmp);
    }

    static async removes(ids, cmp) {
        let param = [];
        ids.forEach(v => param.push(parseInt(v)));
        let req = {
            'ids': param
        };
        await fetch('http://localhost:8080/customer/', {
            method: 'delete',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.selectedCbx = new Set();
            cmp.error = jsonResult.status === 'Success' ? '' : jsonResult.message;
        }).catch((error) => {
            cmp.error = error
        });
        CustomerAPI.searchByKeyword(cmp);
    }

}

export { CustomerAPI }
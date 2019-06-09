import { Utils } from './utils';

class Customer {

    static getById(id, cmp) {
        fetch('http://localhost:8080/customer/' + parseInt(id), {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + cmp.props.token
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.setState({
                singleData: jsonResult.result.data,
                error: jsonResult.status === 'Success' ? '' : jsonResult.message,
                isLoading: false
            });
        }).catch((error) => {
            cmp.setState({
                error: error,
                isLoading: false
            });
        });
    }

    static searchByKeyword(keyword, cmp) {
        let req = {
            "keyword": keyword
        };
        fetch('http://localhost:8080/customer/search', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cmp.props.token
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.total = jsonResult.result.data.length;
            cmp.page = 1;
            cmp.show = 5;
            cmp.setState({
                data: jsonResult.result.data,
                searchData: jsonResult.result.data,
                error: jsonResult.status === 'Success' ? '' : jsonResult.message
            });
        }).catch((error) => {
            cmp.setState({
                data: [],
                searchData: [],
                error: error
            });
        });
    }

    static searchByDateRange(dFrom, dTo, cmp) {
        let req = {
            dFrom: Date.parse(dFrom),
            dTo: Date.parse(dTo)
        };
        fetch('http://localhost:8080/customer/search', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cmp.props.token
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.setState({
                data: jsonResult.result.data,
                searchData: jsonResult.result.data,
                error: jsonResult.status === 'Success' ? '' : jsonResult.message
            });
        }).catch((error) => {
            cmp.setState({
                data: [],
                searchData: [],
                error: error
            });
        });
    }

    static create(name, address, phone, email, dob, company, cmp) {
        let req = {
            "name": name,
            "address": address,
            "phone": phone,
            "email": email,
            "dob": Utils.parseDate(dob),
            "company": parseInt(company)
        };
        fetch('http://localhost:8080/customer/', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cmp.props.token
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.setState({
                singleData: {},
                error: jsonResult.status === 'Success' ? '' : jsonResult.message
            });
            Customer.searchByKeyword('', cmp);
        }).catch((error) => {
            cmp.setState({
                singleData: {},
                error: error
            });
        });
    }

    static edit(id, name, address, phone, email, dob, company, cmp) {
        let req = {
            "name": name,
            "address": address,
            "phone": phone,
            "email": email,
            "dob": Utils.parseDate(dob),
            "company": parseInt(company)
        };
        fetch('http://localhost:8080/customer/' + parseInt(id), {
            method: 'put',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cmp.props.token
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.setState({
                singleData: {},
                error: jsonResult.status === 'Success' ? '' : jsonResult.message
            });
            Customer.searchByKeyword('', cmp);
        }).catch((error) => {
            cmp.setState({
                singleData: {},
                error: error
            });
        });
    }

    static remove(id, cmp) {
        fetch('http://localhost:8080/customer/' + parseInt(id), {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cmp.props.token
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.setState({
                error: jsonResult.status === 'Success' ? '' : jsonResult.message
            });
            Customer.searchByKeyword('', cmp);
        }).catch((error) => {
            cmp.setState({
                error: error
            });
        });
    }

    static removes(ids, cmp) {
        let param = [];
        ids.forEach(v => param.push(parseInt(v)));
        let req = {
            'ids': param
        };
        fetch('http://localhost:8080/customer/', {
            method: 'delete',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cmp.props.token
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.selectedCbx = new Set();
            cmp.setState({
                error: jsonResult.status === 'Success' ? '' : jsonResult.message
            });
            Customer.searchByKeyword('', cmp);
        }).catch((error) => {
            cmp.setState({
                error: error
            });
        });
    }

}

class Company {

    static searchByKeyword(keyword, cmp) {
        let req = {
            "keyword": keyword
        };
        fetch('http://localhost:8080/company/search', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cmp.props.token
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.setState({
                options: jsonResult.result.data,
                error: jsonResult.status === 'Success' ? '' : jsonResult.message
            });
        }).catch((error) => {
            cmp.setState({
                options: [],
                error: error
            });
        });
    }

}

class Account {

    static async login(uid, pwd, cmp) {
        let req = {
            "uid": uid,
            "pwd": pwd
        };
        cmp.setState({
            isLoading: true
        });
        await fetch('http://localhost:8080/account/login', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            if (jsonResult.status === 'Success') {
                cmp.key = jsonResult.result.key;
                localStorage.setItem('key', cmp.key);
                cmp.showModal = false;
            }
            else {
                cmp.error = jsonResult.message;
            }
            cmp.setState({
                isLoading: false
            });
        }).catch((error) => {
            cmp.error = error;
            cmp.setState({
                isLoading: false
            });
        });
    }

}

export {
    Customer,
    Company,
    Account
}
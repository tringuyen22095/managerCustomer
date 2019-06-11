class AccountAPI {

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
            let ok = jsonResult.status === 'Success'
            if (ok) {
                cmp.key = jsonResult.result.key;
                localStorage.setItem('key', cmp.key);
                cmp.showModal = false;
            }
            else {
                cmp.error = jsonResult.message;
            }
            cmp.isLoading = false;
            cmp.setState({});
            if(ok) {
                window.location.href = '/customer/';
            }
        }).catch((error) => {
            cmp.error = error;
            cmp.isLoading = false;
            cmp.setState({});
        });
    }

}

export { AccountAPI }
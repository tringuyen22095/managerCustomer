class CompanyAPI {

    static async searchByKeyword(keyword, cmp) {
        let req = {
            "keyword": keyword
        };
        await fetch('http://localhost:8080/company/search', {
            method: 'post',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('key')
            }
        }).then((result) => {
            return result.json();
        }).then((jsonResult) => {
            cmp.options = jsonResult.result.data;
            cmp.error = jsonResult.status === 'Success' ? '' : jsonResult.message;
        }).catch((error) => {
            cmp.options = [{}];
            cmp.error = error;
        });
        cmp.setState({});
    }

}

export { CompanyAPI }
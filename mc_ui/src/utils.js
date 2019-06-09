import { Const } from './const';

class Utils {

    /**
     * Convert type date to string base on format in const
     * 
     * @param {*} date value need to format
     */
    static formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return Utils.returnDatePos(day, month, year).join(Const.symbol);
    }

    /**
     * return array base on format date in const
     * 
     * @param {*} d day
     * @param {*} m month
     * @param {*} y year
     */
    static returnDatePos(d, m, y) {
        let arr = [];
        for (let i = 0; i < Const.datePos.length; i++) {
            if (Const.datePos[i] === 'dd') {
                arr.push(d);
            }
            else if (Const.datePos[i] === 'MM') {
                arr.push(m);
            }
            else {
                arr.push(y);
            }
        }
        return arr;
    }

    /**
     * Convert from string to date (format date => type date)
     * 
     * @param {*} val string value input
     */
    static parseDate(val) {
        let arr = val.split(Const.symbol);
        let datePos = ['MM', 'dd', 'yyyy'];
        let constDate = Const.datePos;
        for (let i = 0; i < datePos.length; i++) {
            for (let j = 0; j < constDate.length; j++) {
                if (constDate[j] === datePos[i]) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;

                    temp = constDate[i];
                    constDate[i] = constDate[j];
                    constDate[j] = temp;

                    break;
                }
            }
        }
        return Date.parse(arr.join(Const.symbol));
    }
}

export {
    Utils
}
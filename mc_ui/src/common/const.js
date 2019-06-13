import { confirmAlert } from 'react-confirm-alert';
import '../../node_modules/react-confirm-alert/src/react-confirm-alert.css';

export class Const {

    /**
     * Symbol in date
     */
    static symbol = '/';

    /**
     * Position date
     */
    static datePos = ['dd', 'MM', 'yyyy'];
    
    /**
     * Format of date output
     */
    static dateFormat = Const.datePos.join(Const.symbol);

    /**
     * show confirm panel
     */
    static confirmRemove = (id, cmp) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to remove?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { cmp.remove(id); }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    static jsonCustomer = {
        'All1': ['Customer Name', 'Phone', 'Address', 'Email'],
        'Date of birth ': 'Date'
    };
    
    static jsonCompany = {
        'Company Name ': 'Dropdown'
    };
    
}
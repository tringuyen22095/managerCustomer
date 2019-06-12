import React from '../../../node_modules/react';

export class FilterSet extends React.Component {
    constructor(props) {
        super(props);
        this.component = this.props.component;
        console.log(this.component.getComponent().getFilter());
    }

    render() {
        return (
            <>
                <tbody>
                    <tr>
                        <td colSpan='2'></td>
                    </tr>
                </tbody>
            </>
        );
    }
}
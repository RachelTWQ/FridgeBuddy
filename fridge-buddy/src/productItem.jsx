import React, { Component } from 'react';

class ProductItem extends Component {
    render() {
        const isEaten = this.props.isEaten ? "Yes" : "No";
        return (
            <tr>
                <td>
                    {this.props.barcode}
                </td>
                <td>
                    {this.props.productName}
                </td>
                <td>
                    {this.props.entry}
                </td>
                <td>
                    {this.props.exp}
                </td>
                <td>
                    {isEaten}
                </td>
            </tr>
        )
    }
}

export default ProductItem;
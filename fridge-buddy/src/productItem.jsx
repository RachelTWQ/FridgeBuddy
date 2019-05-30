import React, { Component } from 'react';

class ProductItem extends Component {
    render() {

        return (
            <tr>
                <td>
                    {this.props.barcode}
                </td>
                <td>
                    {this.props.productName}
                </td>
                <td>
                    {this.props.category}
                </td>
            </tr>
        )
    }
}

export default ProductItem;
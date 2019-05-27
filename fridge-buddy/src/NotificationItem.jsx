import React from 'react';

export default class NotificationItem extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.name}
        </td>
        <td>
          {this.props.productName}
        </td>
        <td>
          {this.props.category}
        </td>
        <td>
          {this.props.entry}
        </td>
        <td>
          {this.props.exp}
        </td>
        <td>
          {this.props.note}
        </td>
        <td>
          <button>Finished</button>
        </td>
      </tr>
    )
  }
}

import React from 'react';

export default class NotificationItem extends React.Component {


  render() {
    const expStyle = { color: new Date(this.props.expDate) < new Date() && "red"};
    
    return (
      <tr style={ expStyle }>
        <th scope="row">
          {this.props.productName}
        </th>
        {/* <td data-title="Owner">
          {this.props.username}
        </td> */}
        <td data-title="Category">
          {this.props.category}
        </td>
        <td data-title="Entry Date">
          {this.props.entry}
        </td>
        <td data-title="Remind Date">
          {this.props.exp}
        </td>
        <td data-title="Note">
          {this.props.note}
        </td>
        <td data-title="Edit">
          <button className="button" onClick={() => this.props.updateFinished(this.props.notificationId)}>Finished</button>
        </td>
      </tr>
    )
  }
}

import React from 'react';

export default class NotificationItem extends React.Component {


  render() {
    const expStyle = { color: new Date(this.props.expDate) < new Date() && "red"};
    
    return (
      <tr style={ expStyle }>
        <td>
          {this.props.username}
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
          <button onClick={() => this.props.updateFinished(this.props.notificationId)}>Finished</button>
        </td>
      </tr>
    )
  }
}

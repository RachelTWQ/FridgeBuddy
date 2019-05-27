import React from 'react';
import axios from 'axios';

export default class NotificationItem extends React.Component {

  updateFinished (id) {
    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    axios.put(`https://localhost:5001/${userId}/notification/${id}`)
    .then(res => {
      console.log("update isEaten")
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <tr>
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
          <button onClick={() => this.updateFinished(this.props.notificationId)}>Finished</button>
        </td>
      </tr>
    )
  }
}

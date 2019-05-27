import React from 'react';
import axios from 'axios';
import NotificationItem from './NotificationItem.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      newNotification: {}
    };
  }


  componentWillMount() {
    this.listAllNotifications();
  }

  listAllNotifications() {
    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    axios.get(`https://localhost:5001/${userId}/notifications`)
      .then(res => {
        const notifications = res.data;
        this.setState({ notifications })
        console.log("set state")
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <table className="class">
        <thead>
          <tr>
            <th className="col-sm-2 text-center table-data-head">Name</th>
            <th className="col-sm-3 text-center table-data-head">Product Name</th>
            <th className="col-sm-2 text-center table-data-head">Category</th>
            <th className="col-sm-3 text-center table-data-head">Entry Date</th>
            <th className="col-sm-2 text-center table-data-head">Expiry Date</th>
            <th className="col-sm-2 text-center table-data-head">Note</th>
            <th className="col-sm-2 text-center table-data-head">Edit</th>
          </tr>
        </thead>
        <tbody>
          {this.state.notifications.map(notification => (
            <NotificationItem
              key={notification.notificationId}
              notificationId={notification.notificationId}
              username={notification.name}
              entry={notification.entryDate}
              exp={notification.expiryDate}
              note={notification.note}
              productName={notification.productName}
              category={notification.category}
            />
          ))}
        </tbody>
      </table>
    )
  }
}
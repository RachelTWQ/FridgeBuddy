import React from 'react';
import axios from 'axios';
import NotificationItem from './NotificationItem.jsx';
import ProductForm from './productForm.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
    this.listAllNotifications = this.listAllNotifications.bind(this);
    this.updateFinished = this.updateFinished.bind(this);
  }

  componentWillMount() {
    this.listAllNotifications();
  }

  listAllNotifications() {
    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    axios.get(`http://localhost:5000/${userId}/notifications`)
      .then(res => {
        const notifications = res.data;
        this.setState({ notifications })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateFinished(id) {
    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    axios.put(`http://localhost:5000/${userId}/notification/${id}`)
      .then(res => {
        this.listAllNotifications();
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    return (
      <div className="dashboard">
        <aside>
          <ProductForm
            listAllNotifications={this.listAllNotifications}
          />
        </aside>
        <main className="container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                {/* <th scope="col">Owner</th> */}
                <th scope="col">Category</th>
                <th scope="col">Entry Date</th>
                <th scope="col">Remind Date</th>
                <th scope="col">Note</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.notifications.map(notification => (
                <NotificationItem
                  key={notification.notificationId}
                  notificationId={notification.notificationId}
                  // username={notification.name}
                  entry={notification.entryDate}
                  exp={notification.expiryDateString}
                  expDate={notification.expiryDate}
                  note={notification.note}
                  productName={notification.productName}
                  category={notification.category}
                  updateFinished={this.updateFinished}
                />
              ))}
            </tbody>
          </table>
        </main>
      </div>
    )
  }
}
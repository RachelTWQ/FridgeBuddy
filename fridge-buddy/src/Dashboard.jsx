import React from 'react';
import axios from 'axios';
import NotificationItem from './NotificationItem.jsx';
import ProductForm from './productForm.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      newNotification: {},
      newProduct: {}
    };
    this.listAllNotifications = this.listAllNotifications.bind(this);
    this.updateFinished = this.updateFinished.bind(this);
    this.getProductFromBarcode = this.getProductFromBarcode.bind(this);
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

  updateFinished (id) {
    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    axios.put(`https://localhost:5001/${userId}/notification/${id}`)
    .then(res => {
      console.log("update isEaten");
      this.listAllNotifications();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getProductFromBarcode(barcode) {
    let userId = JSON.parse(window.localStorage.getItem('user')).userId;

    axios.get(`https://localhost:5001/${userId}/product/${barcode}`)
    .then(res => {
      const newProduct = res.data;
      this.setState({ newProduct });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  submitNewNotification = (newNotification) => {

    let userId = JSON.parse(window.localStorage.getItem('user')).userId;
    
    axios.post(`https://localhost:5001/${userId}/notification`, newNotification)
    .then(res => {
      console.log("add new notification");
      this.listAllNotifications();
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <>
      <ProductForm 
        getProductFromBarcode={this.getProductFromBarcode}
        submitNewNotification={this.submitNewNotification} 
        productName={this.state.newProduct.productName} 
        category={this.state.newProduct.category}
        productId={this.state.newProduct.productId}
      />
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
              updateFinished={this.updateFinished}
            />
          ))}
        </tbody>
      </table>
      </>
    )
  }
}
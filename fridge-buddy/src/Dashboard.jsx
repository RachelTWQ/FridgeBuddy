import React from 'react';
import NotificationItem from './NotificationItem.jsx';

export default class Dashboard extends React.Component {
    render() {
        <table className="class">
        <thead>
          <tr>
            <th className="col-sm-2 text-center table-data-head">Name</th>
            <th className="col-sm-3 text-center table-data-head">Product Name</th>
            <th className="col-sm-2 text-center table-data-head">Category</th>
            <th className="col-sm-3 text-center table-data-head">Entry Date</th>
            <th className="col-sm-2 text-center table-data-head">Expiry Date</th>
            <th className="col-sm-2 text-center table-data-head">Note</th>
          </tr>
        </thead>
        <tbody>
          {this.props.notifications.map(notification => (
            <NotificationItem 
              key={notification.notificationId} 
              name={notification.name}
              entry={notification.entryDate}
              exp={notification.expiryDate} 
              note={notification.note}
              productName={notification.productName}
              category={notification.category}
              />
          ))}
        </tbody>
        </table>
    }
}
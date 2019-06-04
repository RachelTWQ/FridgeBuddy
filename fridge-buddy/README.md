# Fridge Buddy

Do you have the problem of forgetting what you have in your fridge and end up throwing your grocery away? Are you tired of cleaning up the fridge in your workplace of expired leftover? Fridge Buddy is here to help you save money by reminding you when foods will expire. Fridge Buddy is the easy way to create a refrigerator inventory list on your laptop, your tablet and your phone.

## Tech Stack
* [Create React App](https://github.com/facebook/create-react-app)
* [react-native-init](https://www.npmjs.com/package/react-native-init)
* [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.2)
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
* [MS SQL Server](https://github.com/microsoft/mssql-docker)
* [twilio](https://www.twilio.com/)
* [docker](https://www.docker.com/) (optional)

## Get Started

### `npm install`

Fork this repository, then clone your fork of this repository. Install all the dependencies from fridge-buddy folder for react and finalProject for react-native.


### Running ASP.NET

To run this, you will require both SQLSERVER and visual studio to run the application. If you are in windows, you can download SQL Server management studio and install a version of sql server express. If you are are on mac, you will require an instance of the sql server through a docker image. Instructions can be found [here](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-2017&pivots=cs1-bash).

Next, to run our asp.net application, you will require the visual studio to run the application. Simpily open FinalTest.sln in visual studio. Then hit the play button. By default, it will be connected to your default sql server instance on your localhost:1433.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Feature

* User can register and log in to keep track of their inventory
* User can record what they put in the fridge by typing or scanning through phone camera and customise when to receive text message reminder
* User can scan barcode of the product for better entry experience
* User can modify the product name and category of the products they scanned before
* User can edit the product status before remind date to not receiving reminder

## Screenshot

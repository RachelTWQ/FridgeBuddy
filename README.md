# Fridge Buddy

Do you have the problem of forgetting what you have in your fridge and end up throwing your grocery away? Are you tired of cleaning up the fridge in your workplace of expired leftover? Fridge Buddy is here to help you save money by reminding you when foods will expire as you set. Fridge Buddy is the easy way to create a refrigerator inventory list on your laptop, your tablet and your phone.

## Tech Stack

![React_logo](https://www.shareicon.net/data/128x128/2016/07/08/117367_logo_512x512.png)
![csharp_logo](https://itrainscotland.co.uk/images/c-sharp-logo.png)
![dotnet_logo](https://rahulsahay.gallerycdn.vsassets.io/extensions/rahulsahay/csharp-aspnetcore/1.11.0/1559414167977/Microsoft.VisualStudio.Services.Icons.Default)
![ef_core_logo](https://www.i-programmer.info/images/stories/News/2017/aug/B/ef.jpg)
![sql_logo](https://chocolatey.org/content/packageimages/SQL2014-powershell.12.0.2000.8.png)
![docker_logo](https://fabianlee.org/wp-content/uploads/2017/03/docker-logo-150x150.png)
![twilio_logo](https://d1e2wseyxx8ugp.cloudfront.net/organization-logos/twilio.com)

* [Create React App](https://github.com/facebook/create-react-app)
* [react-native-init](https://www.npmjs.com/package/react-native-init)
* [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
* [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.2)
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
* [MS SQL Server](https://github.com/microsoft/mssql-docker)
* [docker](https://www.docker.com/)
* [twilio](https://www.twilio.com/)
* [axios](https://github.com/axios/axios)
* [serveo](https://serveo.net/)

## Get Started

### `npm install`

Fork this repository, then clone your fork of this repository. Install all the dependencies from fridge-buddy folder for react and finalProject for react-native.


### Running ASP.NET

To run this, you will require both SQL SERVER and visual studio to run the application. If you are in windows, you can download SQL Server management studio and install a version of sql server express. If you are are on mac, you will require an instance of the sql server through a docker image. Instructions can be found [here](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-2017&pivots=cs1-bash).

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
![phone.jpg](https://github.com/RachelTWQ/FridgeBuddy/blob/master/screenshots/IMG_0160.jpg)

![landing_page.png](https://github.com/RachelTWQ/FridgeBuddy/blob/master/screenshots/landing_page.png)

![dashboard.png](https://github.com/RachelTWQ/FridgeBuddy/blob/master/screenshots/dashboard.png)

![register.png](https://github.com/RachelTWQ/FridgeBuddy/blob/master/screenshots/register.png)

## Future Feature

* Drop down list for category on web app
* Location detail for each item
* Text regconition for actual expired day
* Speech regconition
* Nuitrition information
* Recipe suggestion
* JWT authentication

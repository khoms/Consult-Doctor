# About Consult-Doctor

It is an cross platform app which helps users to consult their problem with doctors.You can relate to this app as Hamro Doctor,Jivi,etc.The cross platform language used for Consult Doctor is react native.

# Getting Started
 Before getting started,Lets get introduce why we use react native and what background we need to proceed it.React native is a cross platform language deprived of React.js made by facebook for its own purpose.And the term cross platform itself defines that we can build in more than one platform (Android + IOS) using same codebase.The code we use while making any react native application is javascript(ECMAScript 5).So if you are javascript noob,You have to be familiar with some basic levels of javascript like:
* Async function,javascript Handles,
* Promise functions
* Try/Catch,Constructors
* Types of variables in js
* Function Binding.
In modern application we find using arrow function derived from ECMAScript aka es5.So you have to familiar with that too. 


# Setup

Before jumping to react native workspace,You must install the following.
* Install the latest node from [Node.js Download](https://nodejs.org/en/) 
*  Type **npm install -g react-native-cli** to install react-native package globally.You can use for future react native projects too.
* After that is done you can simply initiate the react-native project using react-native init Consu;t-Doctor(Our project_name)
* It will take some time to setup all the required files for your react-native project.Remind one thing that React native will create the default structure for the workspace.We will customize or extend it in future.




# About default folder structure
After creating the project we will see the folder structure .Now,I will give a  walkthrough about each component(files and folders) in our Consult-Doctor.

### android
It is the folder where all the android binaries are formatted

### ios
It is the folder where all the Ios binaries are formatted

### node_modules
It consists of all the libraries that we require in our project.

### index.js
It is the bootstrapping file loaded at first while runnning the project.

### app.json
It consist of the name and display name for the Project.Example we can change our app name To lets say _Doctor_ by changing it in this file.

### package.json
It consist of all the dependencies/Packages which is required for the Project.So The person who clones the project can install all the dependencies by commmanding **npm install --save**.It will create the node_modules folder and all the required libraries mentioned in package.json will be installed.

### App.js 
It will default create some random welcome code.In our project we will not use this file.So we can ignore this.

# Customizing the project structure

Lets create a folder named src(You can name anything you like) inside the Root Folder(Consult-Doctor) where we design the required folder structures needed for our project.



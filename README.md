# chatApp-Backend 
This project is node.js back-end code for a Chat application built using Express and MongoDB .POSTMAN is used for
Integration testing using REST API's.

<br/>

## Features

>**Account creation**
- You can create an account using Email.
- You can login  using Email and password or as a Guest-User.
>**Chat creation**
- Only authenticated users can create a chat.
- A jwt is provided during sign-in.

### Data safety
- All Messages are stored in an encrypted format.
- All data of the users are deleted from the database every Sunday.

<br/>

## Dependencies
|npm modules|
|-|
|express|
|mongoose|
|jsonwebtoken|
|dotenv|
|body-parser|
|bcryptjs|
|cors|
|socket.io|

<br/>

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:
  ```shell
git clone https://github.com/vish-n-u/chatApp-Backend
```

2. Change into the project directory:
```shell
cd chatApp_Backend
```

3. Install the dependencies:
```shell
npm install
```

4 .Start the development server:
```shell
npm run start
```

 5.Open your browser and visit http://localhost:5000 to see the app running.
 </br>
 

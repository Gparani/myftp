import { createServer } from "net";

const tab_users = [
  { id: 1, username: "Parani", password: "ParaniG" }
]

export function launch(port) {
  const server = createServer((socket) => {
    console.log("New connection.");
    socket.on("data", (data) => {
      const message = data.toString();

      const [command, ...args] = message.trim().split(" ");
      

      switch(command) {

        case "USER":
          socket.write(USER(args[0])); 
          break;

        case "PASS":
          socket.write(PASS(args[0]));
          break;

        case "LIST":
         LIST(socket);
        break;

        case "PWD":
         socket.write("257, ${process.cwd()} \r\n");
          break;

          case "HELP":
          socket.write(`214, \n "HELP":\n
            USER <username>: check if the user exist\n
            PASS <password>: authenticate the user with a password\n
            LIST: list the current directory of the server\n
            CWD <directory>: change the current directory of the server\n
            RETR <filename>: transfer a copy of the file FILE from the server to the client\n
            STOR <filename>: transfer a copy of the file FILE from the client to the server\n
            PWD: display the name of the current directory of the server\n
            HELP: send helpful information to the client\n
            QUIT: close the connection and stop the program\n
            `);
            break;

        case "QUIT":
          socket.write("199 - closing the connection.\r\n")
          break;
        default:
          console.log("The command is not supported:", command, args);
      
        case "CWD":
          try{
            process.chdir(args[0]);
            socket.write(`250 New directory, ${process.cwd()} \r\n`);
          } catch(err) {
              socket.write(`non-existent file, try another path \r\n`);
          }
          console.log("command not supported:", command, args);
          break;
      }
    });
    socket.write("220 Hello WORLD \r\n");
  });

  server.listen(port, () => {
    console.log("The server has started at localhost:${port}");
  });
}


export function VerifierUsers (username) {
    return tab_users.find((user) => {
      return user.username === username;
    });
};


export function USER (args) {
    return (VerifierUsers(args)) 
        ? "220 user exist. \r\n" 
        : " 530 user doesn't exist.\r\n"
};


export function VerifPASS(password) {
  let result = false;
  for (const user of tab_users) {
      if(user.password == password)
          result = true;
  }
  return result;
};



export function PASS(args) {
  let result = ''
  if(VerifPASS(args))
      result = "230, your password is correct  !. \r\n";
  else
      result = "530, your password is incorrect.\r\n";

      return result;
};



export function LIST(socket) {
  fs.readdir(process.cwd(), (err, files) => {
    let list="";
    files.forEach(file=>{list+=file+"\r\n"})
    socket.write(list)

  })
     
};
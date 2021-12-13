# myftp
# MyFTP

The client must handle the following commands:

* USER <username>: check if the user exist
* PASS <password>: authenticate the user with a password
* LIST: list the current directory of the server
* CWD <directory>: change the current directory of the server
* RETR <filename>: transfer a copy of the file FILE from the server to the client
* STOR <filename>: transfer a copy of the file FILE from the client to the server
* PWD: display the name of the current directory of the server
* HELP: send helpful information to the client
* QUIT: close the connection and stop the program

<p align="right"><a href="#top">back to top</a></p>

### <a name='USER'>USER</a>

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


### <a name='PASS'>PASS</a>

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
      
### <a name='LIST'>LIST</a>

export function list(socket) {
    fs.readdir(process.cwd(), (err, files) => {
      let list="";
      files.forEach(file=>{list+=file+"\r\n"})
      socket.write(list)  
    })      
};

### <a name='CWD'>CWD</a>

`sh
try{
      process.chdir(args[0]);
      socket.write(`250 New directory, ${process.cwd()} \r\n`);
    } catch(err) {
       socket.write(`non-existent file, try another path \r\n`);
       }


### <a name='PWD'>PWD</a>

````sh
    socket.write("257, ${process.cwd()} \r\n");
````

### <a name='QUIT'>QUIT</a>

````sh
socket.write("221 closing connection \r\n");
socket.destroy();
````

### <a name='HELP'>HELP</a>

````sh
socket.write(214, \n "HELP":\n
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
````


## <a name='credits'>Credits</a>

* Parani Gnanapandithar

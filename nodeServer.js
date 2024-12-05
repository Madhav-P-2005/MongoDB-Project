const http = require("http");
const port = 8081; // local port num

const toDoList = ["rohan", "rohit", "neol", "madhav", "trupti"];

http
  .createServer(
    (
      req,
      res // call back function 1
    ) => {
      // method name is the request

      // url is the response
      const { method, url } = req; // By default method is GET
      // console.log(method, url);
      // res.end();
      if (url == "/todo") {
        // Your browser only supports GET method . Use postman for other methods
        // Alternative of postman is thunderClient .
        if (method === "GET") {
          // res.writeHead(200, {"Content-Type" : "text/html"})  // so here the {"Content-type" : "text/html"} helps to display the output in html content not in black screen
          res.writeHead(200); // Displays content in black screen
          res.write(toDoList.toString());
        } else if (method == "POST") {
          let body = "";
          req
            .on("error", (err) => {
              console.log(err);
            })
            .on("data", (chunk) => {
              body += chunk;
              console.log(chunk);
              /*
                Output :- 
                <Buffer 7b 0a 20 20 20 22 6e 61 6d 65 22 20 3a 20 22 4d 61 64 68 61 76 20 50 22 2c 0a 20 20 20 22 61 67 65 22 20 3a 20 31 39 0a 7d>     // Hexa - decimal format 
data :  { name: 'Madhav P', age: 19 }
                */
            })
            .on("end", () => {
              body = JSON.parse(body);
              // adding new array
              let newToDo = toDoList;
              newToDo.push(body.item);
              console.log(newToDo);
              //console.log("data : ",body);
            });
        } else if (method == "DELETE") {
          let body = "";
          req
            .on("error", (err) => {
              console.log(err);
            })
            .on("data", (chuck) => {
              body += chuck;
            })
            .on("end", () => {
              body = JSON.parse(body);

              let deleteThisItem = body.item;
              for (let i = 0; i < toDoList.length; i++) {
                if (toDoList[i] == deleteThisItem) {
                  toDoList.splice(i, 1);
                  break;
                } else {
                  console.error("Error : Match Not Found !");
                  break;
                }
              }

              // or

              // toDoList.find((elem , index) =>{
              //     if(elem === deleteThisItem)
              //     {
              //         toDoList.splice(index , 1);
              //     }
              //     else{
              //         // cannot use Break here as its not loop
              //         console.error("Error : Match Not Found !")
              //     }
              // });
            });
        } else {
          res.writeHead(501); // 501 is not authorised
        }
      } else {
        res.writeHead(404); // Server Not found
      }
      res.end();

      // http://localhost:8081
      // http://localhost:8081/  both are same

      // res.writeHead(200, { "Content-Type" : "text/html"  });  // Additional body data
      // // Optional one is {"Content-Type" : "text/html"}
      // res.write("<h4>  Hey Server started :-) 123456789 </h4>");
      // res.end();
    }
  )

  .listen(port, () => {
    // call back function 2
    console.log(`Node Js server is up and running on port ${port}`);
  });

// const http = require("http");

// const port = 8081;
// const toDoList = ["rohan", "rohit", "neol", "madhav", "trupti"];

// http.createServer((req, res) => {
//     const { method, url } = req;

//     console.log(`${method} ${url}`);

//     if (url === "/todo" && method === "GET") {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write(toDoList.toString());
//         res.end();
//     } else if (method === "GET" && url.startsWith("/")) {
//         const name = url.substring(1); // Remove the leading slash to get the name
//         if (toDoList.includes(name)) {
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.write(`<h4>${name}</h4>`);
//         } else {
//             res.writeHead(404, { "Content-Type": "text/html" });
//             res.write("<h4>Not Found</h4>");
//         }
//         res.end();
//     } else {
//         res.writeHead(404, { "Content-Type": "text/html" });
//         res.write("<h4>Not Found</h4>");
//         res.end();
//     }
// }).listen(port, () => {
//     console.log(`Node.js server is up and running on port ${port}`);
// });

/*
 Routers :-

 >> http://localhost:8081/signin
 >> http://localhost:8081/signup
 >> http://localhost:8081/home
 >> http://localhost:8081/contactUs
 >> http://localhost:8081/AboutUs

 --> Therefore signin, signup etc ..... are the routers 
*/

// http://localhost:8081/

// / is used to append the url

// /user
// /sign.in
// /sign-up

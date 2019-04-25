import express  from "express";
import graphQLHTTP  from "express-graphql";

let PORT = 9090;

let app = express();

app.use(graphQLHTTP({
    
}))

app.listen(PORT);
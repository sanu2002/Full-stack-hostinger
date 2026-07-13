import express from "express" ;
import cors from "cors" ;

const app=express() ;


app.use(express.json()) 

// we can resolve in  frontend side but it will only work in  dev mode not Production 

// export default defineConfig({
//   plugins: [react()],
//   server:{
//     proxy:{
//       "/api":{
//         target:"http://localhost:4000/",
//         changeOrigin:true ,
//       }
//     }
//   }
// })



app.use(cors(
   {
    origin:[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://200.97.168.127:3000"
    //add Production URL ??
   ],
   credentials:true,
//    methods:["GET","POST"],
//    allowedHeaders:["Content-Type","Authorization"]
   }
)) 


app.get("/api/message",(req,res)=>{
    res.json({message:"Hellow from chaicode server "});
})


const PORT=  4000
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

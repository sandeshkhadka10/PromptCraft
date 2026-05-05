import express from "express";

const router = express.Router();

// test
router.post("/test",(req,res)=>{
    try{
        const thread = new Thread({
            threadId: "xyz",
            title: "Testing New Thread"
        });

        const response = await thread.save();
        res.send(response);

    }catch(error){
        console.log(error);
    }
})
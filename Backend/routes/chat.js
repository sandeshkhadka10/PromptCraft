import express from "express";
import Thread from "../models/Thread.js";

const router = express.Router();

// test
router.post("/test",async(req,res)=>{
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
});

// Get all threads
// router.get("/thread",async(req,res)=>{
//     try{
//         const threads = await Thread.find({}).sort({updatedAt: -1});
//         res.send(threads);
//     }catch(error){
//         console.log(error);
//     }
// });

export default router;
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
router.get("/thread",async(req,res)=>{
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to fetch chat"});
    }
});

router.get("/thread/:threadId",async(req,res)=>{
    const {threadId} = req.params;
    try{
        const thread = new Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error:"Thread is not found"});
        }
        res.json(thread.messages);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to fetch chat"});
    }
});

router.delete("/thread/:threadId",async(req,res)=>{
    const {threadId} = req.params;
    try{
        const deletedThread = new Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error:"Thread not found"});
        }
        res.status(200).json({success:"Thread deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to fetch chat"});
    }
})

export default router;
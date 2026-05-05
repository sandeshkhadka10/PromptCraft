import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

// test
// router.post("/test",async(req,res)=>{
//     try{
//         const thread = new Thread({
//             threadId: "xyz",
//             title: "Testing New Thread"
//         });

//         const response = await thread.save();
//         res.send(response);

//     }catch(error){
//         console.log(error);
//     }
// });

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
        const thread = await Thread.findOne({threadId});
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
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error:"Thread not found"});
        }
        res.status(200).json({success:"Thread deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to fetch chat"});
    }
});

router.post("/chat",async(req,res)=>{
    // check whether it contains threadId and message
    const {threadId,message} = req.body;
    if(!threadId || !message){
        return res.status(400).json({error:"Missing required fields"});
    }

    try{
        // check whether the old threadId exits or not
        const thread = await Thread.findOne({threadId});

        if(!thread){
            // if the threadId doesn't exits then create the new threadId
            thread = await new Thread({
                threadId,
                title: message, // the message we sent will be title
                messages: [{role: "user", content: message}]
            });
        }else{
            thread.messages.push({role: "user", content: message});
        }

        // now here we reply the message given by the user through OpenAPI assistant
        const assistantReply = await getOpenAIAPIResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantReply});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Something went wrong"});
    }
});

export default router;
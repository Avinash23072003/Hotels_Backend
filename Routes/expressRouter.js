const express = require("express");
const router = express.Router();
const Person = require('./../models/Person');
const { findByIdAndUpdate } = require("../models/Menu");
// Routes

// POST-GET Method for person data
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data); // Initialize newPerson with request body data
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find(); // Corrected the fetch operation
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// POST-GET Method for Menu


router.get('/:workType',async (req,res)=>{
    try{
      const workType=req.params.workType;
      if(workType=='chef' || workType=='manager'){
       const response=await Person.find({work:workType});
       console.log('Data fetched');
       res.status(200).json(response);
      }
      else{
       console.log('error');
       res.status(404).json({ error: "Data not found" });
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
   })

router.put('/:id', async(req,res)=>{
try{
    const PersonId=req.params.id;
    const updatedData=req.body;
    const response= await Person.findByIdAndUpdate(PersonId,updatedData,{
        new:true,
        runValidators:true
    })
    if (!response) {
        return res.status(404).json({ error: "Person not found" });
    }
    console.log('Data updated sucessfully');
    res.status(200).json(response);
    }
catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
}
})



router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log('Data deleted successfully');
        res.status(200).json({ message: "Person's data deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});






module.exports = router;
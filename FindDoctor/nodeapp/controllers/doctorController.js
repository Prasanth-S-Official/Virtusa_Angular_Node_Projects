const Doctor = require('../models/doctorModel');

const addDoctor = async (req, res) => {
  try {
    await Doctor.create(req.body);
    res.status(200).json({ "message": "Docter added Successfully" });
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: error.message });
  }
}

const getAllDoctors = async (req, res) => {
  try {
    const sortValue = req.query.sortValue || 1;
    const search = req.query.searchValue || '';
    const searchRegex = new RegExp(search, 'i');
    const doctors = await Doctor.find({firstName : searchRegex}).select('-_id -__v')
     .sort({experience : parseInt(sortValue)});
    //  console.log("doctors",doctors);
    res.status(200).json({doctors});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateDoctor = async (req, res) => {
   try{
    const { doctorId } = req.params;
    const doctor = await Doctor.findOneAndUpdate({doctorId}, req.body , {new : true});
    if(!doctor){

        return res.status(404).json({"message" : "Doctor not found"});
        }else{
          res.status(200).json({ "message": "Doctor Updated Successfully" });
        }
   } catch (error) {
    res.status(500).json({ message: error.message });
}
};

const deleteDoctor = async (req, res) => {
  try{

    const { doctorId } = req.params;
    const doctor = await Doctor.findOneAndDelete({doctorId});
    if(!doctor){
        return res.status(404).json({"message" : "Doctor not found"});
        }
    res.status(200).json({ "message": "Doctor Deleted Successfully" });
   } catch (error) {
    res.status(500).json({ message: error.message });
}
};

const getDoctorById = async (req, res) => {
  try{

    const { doctorId } = req.params;
    const doctor = await Doctor.findOne({doctorId}).select('-_id -__v');
    if(!doctor){
        return res.status(404).json({"message" : "Doctor not found"});
        }
    res.status(200).json(doctor);
   } catch (error) {
    res.status(500).json({ message: error.message });
}
};

const getDoctorByUserId = async (req, res) => {
try 
{
  const {userId} = req.params;

  const search = req.query.searchValue || '';
  const searchRegex = new RegExp(search, 'i');
  const doctor = await Doctor.find({userId, firstName : searchRegex}).select('-_id -__v')
  if(doctor.length === 0 ){
    return res.status(404).json({"message" : "Doctor not found"});
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log("error",error.message);
    res.status(500).json({ message: error.message});
  }
};


module.exports = {
  addDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctorByUserId
};

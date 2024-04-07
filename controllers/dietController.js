import slugify from "slugify";
import dietModel from "../models/dietModel.js";

const createDietController = async (req, res) => {
  try {
    const { name, slug, description, isFeatured, plan } = req.body;

    // Check if all required fields are present
    if (
      !name ||
      !plan ||
      !Array.isArray(plan) ||
      plan.length === 0
    ) {
      return res.status(400).json({ message: "Fillout all fields" });
    }

    // Create a new instance of the Diet model
    const newDiet = await new dietModel({
      name,
      slug: slugify(name),
      description,
      isFeatured,
      plan,
    }).save();

    res
      .status(201)
      .send({success:true, message: "Diet plan created successfully", dietData: newDiet });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error create dietplan",
      error,
    });
  }
};

// get diet plan
const getDietPlanController = async (req, res) => {
    try {
        const dietPlan = await dietModel.find({})

        res.status(200).send({
            success: true,
            message: "All Diet plans get",
            dietPlan
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error getting dietplan",
            error,
        });
    }
};

// get single diet plan
const getSingleDietPlanController = async (req, res) => {
    try {
        const dietPlan = await dietModel.findById(req.params.id, {})

        res.status(200).send({
            success: true,
            message: "All Diet plans get",
            dietPlan
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error getting dietplan",
            error,
        });
    }
};

// delete diet plan
const deleteDietPlan = async (req, res) => {
    try {
        const {id} = req.params;
        await dietModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Diet plan deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error deleting dietplan",
            error,
        });
    }
};

export { createDietController, getDietPlanController, getSingleDietPlanController, deleteDietPlan };

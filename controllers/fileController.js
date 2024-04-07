import fileModel from "../models/fileModel.js";
import fs from "fs";
import slugify from "slugify";

const createFileController = async (req, res) => {
  try {
    const { name, description, category, isFeatured, isSpecial } = req.fields;
    const { file } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case file && file.size > 1000000:
        return res
          .status(400)
          .send({ error: "File is Required and must be lesser than 1mb" });
    }

    const fileInfo = new fileModel({ ...req.fields, slug: slugify(name) });

    if (file) {
        fileInfo.file.data = fs.readFileSync(file.path);
        fileInfo.file.contentType = file.type;
    }

    await fileInfo.save();
    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
      fileInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error Creating Product",
    });
  }
};

// Update File
const updateFileController = async (req, res) => {
  try {
    const { name, description, category, isFeatured, isSpecial } = req.fields;
    const { file } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case file && file.size > 1000000:
        return res
          .status(400)
          .send({ error: "File is Required and must be lesser than 1mb" });
    }

    const fileInfo = await fileModel.findByIdAndUpdate(
        req.params.fid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
    );

    if (file) {
        fileInfo.file.data = fs.readFileSync(file.path);
        fileInfo.file.contentType = file.type;
    }

    await fileInfo.save();

    res.status(200).send({
      success: true,
      message: "File Update Successfully",
      fileInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error Updating File",
    });
  }
};

// Get File
const getFileInfo = async (req, res) => {
    try {
        const fileInfo = await fileModel
        .find({})
        .populate("category")
        .select("-file")
  
      res.status(200).send({
        success: true,
        total: fileInfo.length,
        message: "All FilesInfo",
        fileInfo,
      }); 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error getting fileInfo",
        });
    }
};

// Get File
const getFileController = async (req, res) => {
    try {
      const rawFile = await fileModel.findById(req.params.fid).select("file");
      if (rawFile.file.data) {
        res.set("Content-Type", "application/pdf");
        // res.set("Content-Disposition", `attachment; filename="${file.name}.pdf"`);
        return res.status(200).send(rawFile.file.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error Getting File",
      });
    }
};

// Delete Product
const deleteproductController = async (req, res) => {
    try {
      await fileModel.findByIdAndDelete(req.params.pid).select("-file");
      res
        .status(200)
        .send({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error Creating Product",
      });
    }
};

// Search Product
const searchFileController = async (req, res) => {
    try {
      const {keyword} = req.params
      const results = await fileModel.find({
        $or:[
          {name: {$regex: keyword, $options: "i"}},
        ]
      }).select("-file")
  
      res.json(results);
      
    } catch (error) {
        console.log(error);
      res.status(400).send({
        success: false,
        message: "Error Search Product",
        error,
      });
    }
};

export {createFileController, updateFileController, getFileInfo, getFileController, deleteproductController, searchFileController}
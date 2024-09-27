import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { User } from "../Models/user.js";

dotenv.config();

export const getresumeanalysis = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.resume.length <= 0) {
      return res.status(500).json({
        success: false,
        error: "Resume data not found",
      });
    }

    const { description, qualification } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const responseData = user.resume;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `This is my resume data in text format, Resume Data: ${responseData}. They are job descriptions and qualifications for a job role I am going to apply, 
    Job Description: ${description}, Job Qualification: ${qualification}. Analyze the following data and provide a array of array strings in JavaScript response with three
    fields:
    - Probability: A number out of 100 indicating the probability of my resume getting selected for the job.
    - Problems: An array of strings listing issues with my resume.
    - Suggestions: An array of strings with recommendations to improve my resume for this job role.
    The format should be like [[Probability], [Problems], [Suggestions]] . Probability should be a number in string format and Problems and Suggestions should be multiple strings
     in an array with comma seperated if multiple problems and suggations exists. Don't give any unnecessry details just give the array of array of strings in the format I have mentioned.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.status(200).json({
        success: true,
        data: text,
      });
      req.resumeanalysis = text;
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

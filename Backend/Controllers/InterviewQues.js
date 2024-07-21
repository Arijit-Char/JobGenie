import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { User } from "../Models/user.js";

dotenv.config();

export const interviewques = async (req, res, next) => {
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

    const prompt = `This is my resume data in text format. Resume Data: ${responseData}, This is the job I am applying for. 
    Job Description: ${description} and This is the job qualification I am applying for. Job Qualification: ${qualification}.
    Analyse my resume, job description and job qualification and find out top 20 interview questions with perfect answers that can be 
    asked for this job. Send me an array of array in JavaScript where the array contains only that 20 interview questions and 
    answers respectively. Only send the array of array, first array include 20 arrays and every array include 2 strings, First string is 
    the question and second string is the answer. Only send me this nothing else.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.status(200).json({
        success: true,
        data: text,
      });
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

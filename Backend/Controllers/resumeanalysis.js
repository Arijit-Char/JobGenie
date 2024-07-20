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

    const prompt = `This is my resume data in text format. Resume Data: ${responseData}, This is the job I am applying for. Job Description: ${description} and This is the job qualification I am applying for. Job Qualification: ${qualification}.Analyse
         my resume, job description and job qualification and find out all the points:  give the percent of probablity of my resume to get selected for that job role,
       Problems with my resume, and how can I make my resume perfect for this job. Just send me a JSON object no need to send anythin else.`;

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

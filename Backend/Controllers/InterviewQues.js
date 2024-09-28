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
    Analyse my resume, job description and job qualification and find out top 20 technical interview questions with perfect answers that can be 
    asked for this job. Send me an array of array where the array contains only that 20 interview questions and 
    answers respectively. Only send the array of array of strings, first array include 20 arrays and every array include 2 strings, First string is 
    the question and second string is the answer both are comma seperated. Only send me this nothing else.Don't give any unnecessry details just give the array of array of strings in the format I have mentioned.
    Don't forget to close the array. array format must be like [[Question1, Answer1], [Question2, Answer2], [Question3, Answer3], [Question4, Answer4], [Question5, Answer5], [Question6, Answer6], [Question7, Answer7], [Question8, Answer8], [Question9, Answer9], [Question10, Answer10], [Question11, Answer11], [Question12, Answer12], [Question13, Answer13], [Question14, Answer14], [Question15, Answer15], [Question16, Answer16], [Question17, Answer17], [Question18, Answer18], [Question19, Answer19], [Question20, Answer20]]`;


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

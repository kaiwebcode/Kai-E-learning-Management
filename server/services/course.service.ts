// course.service.ts
import { Response, NextFunction } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/CatchAsyncErrors";

export const createCourse = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    try {
      const course = await CourseModel.create(data);

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error) {
      next(error); // Pass error to error-handling middleware
    }
  }
);


// Get All Courses
export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
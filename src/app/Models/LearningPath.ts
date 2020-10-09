import { base } from './Base';

export interface LearningPath extends base{
    name:string;
    slug:string;
    totalCourses:number;
    pathIcon:string;
    learningPathDescription:string;
}


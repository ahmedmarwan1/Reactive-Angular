import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable({
    providedIn: 'root'
})
export class CourseService{
    constructor(private http: HttpClient){}

    loadCourseById(courseId: number){
        return this.http.get<Course>(`/api/courses/${courseId}`)
            .pipe(
                shareReplay()
            ); 
    }

    loadAllCourseLessons(courseId: number) : Observable<Lesson[]>{
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                pageSize: "1000",
                courseId: courseId.toString()
            }
        })
            .pipe(
                map(res => res["payload"]),
                shareReplay()
            )
    }

    loadAllCourses() : Observable<Course[]>{
        return this.http.get<Course[]>("/api/courses")
            .pipe(
                map(res => res["payload"]),
                shareReplay()
            );
    }

    saveCourse(courseId: string, changes: Partial<Course>){
        return this.http.put(`/api/courses/${courseId}`,changes).pipe(shareReplay());
    }

    searchLessons(search: string) : Observable<Lesson[]>{
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                filter: search,
                pageSize: "100"
            }
        })
            .pipe(
                map(res => res["payload"]),
                shareReplay()
            )
    }
}
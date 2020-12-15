import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.css']
})
export class CourseHomeComponent implements OnInit {

  color = '#32007a';
  editAboutUs = false;
  aboutUsText = '<strong>Hello World</strong>'; // EditorChangeContent | EditorChangeSelection;
  blured = false;
  focused = false;
  levels: string[] = ['Anyone', 'Beginner', 'Intermidiate', 'Expert'];


  constructor() { }

  ngOnInit(): void {
  }

  public editAboutUsCard(edit: boolean){
    console.log('ting', this.aboutUsText);
    this.editAboutUs = edit;
  }

  created(event) {
    // tslint:disable-next-line:no-console
    console.log('editor-created 1', event);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    if(event['html']!= undefined)
    {
      this.aboutUsText = event['html'];

      console.log('editor-change 2', event['html']);
    }

  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blured = false;
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blured = true;
  }

}

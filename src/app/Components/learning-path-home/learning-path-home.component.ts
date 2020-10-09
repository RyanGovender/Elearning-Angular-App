import { Component, OnInit, Input } from '@angular/core';
import { LearningPathService } from '../learning-path/learning-path.service';
import { LearningPath } from 'src/app/Models/LearningPath';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learning-path-home',
  templateUrl: './learning-path-home.component.html',
  styleUrls: ['./learning-path-home.component.css']
})
export class LearningPathHomeComponent implements OnInit {

  private _idAttributeName = 'id';
  SelectedLearningPath : LearningPath;
  array: LearningPath [];

  constructor(private _learningPathService:LearningPathService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    if(this.UndefinedAndNullCheck(this._learningPathService.AllLearningPath))
    this.GetLearningPathByID();
  }

  GetLearningPathByID()
  {
      var temp  = this._learningPathService.AllLearningPath
      .filter(x=>x.id == this.GetIdFromRoute(this._idAttributeName));
      if(this.UndefinedAndNullCheck(temp))this.SelectedLearningPath = temp[0];
  }

  GetIdFromRoute(value)
  {
    return +this.route.snapshot.paramMap.get(value);
  }

  UndefinedAndNullCheck(value)
  {
     return value!=undefined || value!=null;
  }

  
}

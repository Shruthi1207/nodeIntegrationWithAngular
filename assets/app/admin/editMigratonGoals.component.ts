
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MigrationGoalService } from '../migration-goals/migration-goal.service';
import { MigrationGoalsWithScores} from '../migration-goals/migrationGoalsWithScores.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-MigrationGoal',
  templateUrl: './editMigratonGoals.component.html',
  styleUrls: ['./editMigratonGoals.component.css']
})
export class EditMigratonGoalsComponent implements OnInit {
  MigrationGoalsWithScores: MigrationGoalsWithScores;
  source: LocalDataSource;

  data: { text: string; grouping: string; hover: string; rank: number; scores?: any[] }[] = [
    {
      text: "1",
      grouping: "Leanne Graham",
      hover: "Bret",
      rank: 2,
      scores: [
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ]
    },
    {
      text: "2",
      grouping: "Ervin Howell",
      hover: "Antonette",
      rank: 1,
      scores: [
        1,
        1,
        0,
        1,
        1,
        0,
        1
      ]
    }
  ];

  // add this into setting if want to add delete button also and confirm delete warning.
  // delete: {
  //   confirmDelete: true,
  // },
  settings = {
    sort: false,
    actions: {
      delete: false,
    },

    add: {
      confirmCreate: true,

      filter: false, // use it if you want to disable the flter for every column.
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      text: {
        title: 'Questions', 

      },
      grouping: {
        title: 'Grouping',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'saas', title: 'saas' },
            { value: 'business', title: 'business' },
            { value: 'ipaas', title: 'ipaas', }],
          },
        },
      },
      hover: {
        title: 'Hover Text'
      },
      rank: {
        title: 'Rank'
      },
      scores: {
        title: 'Scores',

      }
    }
  };

  constructor(private migrationGoalService: MigrationGoalService, private router: Router,private authService: AuthService) {
    this.source = new LocalDataSource();
  }
  
  ngOnInit() {
    if (!this.authService.isAdmin())
    this.router.navigateByUrl('/auth/signin');
    this.setMigrationGoalsWithScores();
  }
  setMigrationGoalsWithScores(){
    this.migrationGoalService.getMigrationGoalsWithScores().subscribe((data) => {
      this.source.load(data);
    });
  }

  
  // Update
  onSaveConfirm(event) {
    if (event.newData && event.newData.text && event.newData.grouping && event.newData.rank &&
      event.newData.hover && event.newData.scores && this.isScoresPattern(event.newData.scores )
      && this.isNumber(event.newData.rank)) {

      if (window.confirm('Are you sure you want to save?')) {
        
        console.log(event.data);
        
        // event.newData['name'] += ' + added in code';
        this.MigrationGoalsWithScores = new MigrationGoalsWithScores(event.newData.text,
          event.newData.grouping, event.newData.rank, event.newData.hover, JSON.parse("[" + event.newData.scores + "]")
          , event.newData.id);

        this.migrationGoalService.updateMigrationGoal(this.MigrationGoalsWithScores)
          .subscribe(
          data => {
            event.confirm.resolve(event.newData);
            console.log("created successfuly");
          },
          error => {
            event.confirm.reject();
            let err: any;
            err = error.error.message;
          });

      } else {
        event.confirm.reject();
      }
    }
    else {
      event.confirm.reject();
    }

  }
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      
      console.log(event.data);
      this.migrationGoalService.deleteMigrationGoal(event.data.id)
        .subscribe(
        data => {
          event.confirm.resolve();
        },
        error => {
          let err: any;
          err = error.error.message;
          event.confirm.reject();

        }
        );

    } else {
      event.confirm.reject();
    }
  }
  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  isArrayLength7(inputscores) {
    var scoresArray = inputscores.split(',');
    return scoresArray.length == 7;
  }
  isScoresPattern(inputscores){
    var regexp = new RegExp('^[0-9]+(,[0-9]+){6}$'); ///^[0-1]+(,[0-1]+){6}$/
    return regexp.test(inputscores);
  }
  onCreateConfirm(event) {    
   
    if ( event.newData && event.newData.text && event.newData.grouping && event.newData.rank &&
      event.newData.hover && event.newData.scores  && this.isScoresPattern(event.newData.scores )&& this.isArrayLength7(event.newData.scores)
      && this.isNumber(event.newData.rank)) {

      if (window.confirm('Are you sure you want to create?')) {
        
        while (event.source.data.find(data => data.rank == event.newData.rank)) {
          event.newData['rank'] -= .01;
        }

        console.log(event.data);
        // event.newData['name'] += ' + added in code';
        this.MigrationGoalsWithScores = new MigrationGoalsWithScores(event.newData.text, event.newData.grouping, event.newData.rank,
          event.newData.hover, JSON.parse("[" + event.newData.scores + "]"));

        this.migrationGoalService.addMigrationGoal(this.MigrationGoalsWithScores)
          .subscribe(
          data => {
           // console.log(data.id);
            event.confirm.resolve(event.newData);
            console.log("created successfuly");
            this.setMigrationGoalsWithScores();
          },
          error => {
            event.confirm.reject();
            let err: any;
            err = error.error.message;
          });
      } else {
        event.confirm.reject();
      }
    }
    else
      event.confirm.reject();
    }
  

};
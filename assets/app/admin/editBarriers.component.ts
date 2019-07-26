import { Component, OnInit } from '@angular/core';
import { BarrierService } from '../barriers/barrier.service';
import { Barrier } from '../barriers/barrier.model';
import { LocalDataSource } from 'ng2-smart-table';
import { BarrierWithScores } from '../barriers/barrierWithScores.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-Barriers',
  templateUrl: './editBarriers.component.html',
  styleUrls: ['./editBarriers.component.css']
})
export class EditBarriersComponent implements OnInit {
  BarrierWithScores: BarrierWithScores;
  

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
            list: [{ value: 'ent-arch', title: 'ent-arch' },
            { value: 'infrastructure', title: 'infrastructure' },
            { value: 'integration', title: 'integration', }],
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

  constructor(private barrierService: BarrierService, private router: Router,private authService: AuthService) {
    this.source = new LocalDataSource();
  }
  ngOnInit() {
    if (!this.authService.isAdmin())
    this.router.navigateByUrl('/auth/signin');
    this.setBarriersWithScores();
  }
  setBarriersWithScores(){
    this.barrierService.getBarriersWithScores().subscribe((data) => {
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
        this.BarrierWithScores = new BarrierWithScores(event.newData.text,
          event.newData.grouping, event.newData.rank, event.newData.hover, JSON.parse("[" + event.newData.scores + "]")
          , event.newData.id);

        this.barrierService.updateBarrier(this.BarrierWithScores)
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
      this.barrierService.deleteBarrier(event.data.id)
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
    var regexp = new RegExp('^[0-1]+(,[0-1]+){6}$'); ///^[0-1]+(,[0-1]+){6}$/
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
        this.BarrierWithScores = new BarrierWithScores(event.newData.text, event.newData.grouping, event.newData.rank,
          event.newData.hover, JSON.parse("[" + event.newData.scores + "]"));

        this.barrierService.addBarrier(this.BarrierWithScores)
          .subscribe(
          data => {
           // console.log(data.id);
            event.confirm.resolve(event.newData);
            console.log("created successfuly");
            this.setBarriersWithScores();
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
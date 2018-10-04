import { CompetitionService } from '../../services/competition.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  competitions: any[];

  constructor(private service: CompetitionService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(competitions => {
        this.competitions = competitions;
      });
  }
}

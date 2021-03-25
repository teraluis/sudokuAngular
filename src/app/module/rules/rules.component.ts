import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  @Input() rulers: GameRulers;
  constructor() { }

  ngOnInit(): void {
  }

}
export interface GameRulers {
  name: string;
  created: Date;
  createdBy: string;
  rulers: string[];
}

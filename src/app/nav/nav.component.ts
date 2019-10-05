import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() selection: string;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }
  
  onTabNavigate(string) {
    this.router.navigate([string]);
  }

}

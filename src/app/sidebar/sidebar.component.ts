import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { sidebarItems } from './sidebar-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor() {}
  items!: MenuItem[];

  ngOnInit(): void {
    this.items = sidebarItems;
  }
}

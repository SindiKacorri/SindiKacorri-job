import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-job-seekers',
  templateUrl: './job-seekers.component.html',
  styleUrls: ['./job-seekers.component.css']
})
export class JobSeekersComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

}

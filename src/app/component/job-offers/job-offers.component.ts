import { Component, OnInit } from '@angular/core';
import {Recruiters} from "../../model/recruiters";
import {AuthService} from "../../shared/auth.service";
import {DataService} from "../../shared/data.service";
import {UserEvent} from "../../shared/user-event";

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {
  recruitersList: Recruiters [] = [];
  recruitersObj: Recruiters = {
    id: '',
    jobName: '',
    details: ''
  };
  jobName: string = '';
  details: string = '';
  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }
  resetForm() {
    this.jobName = '';
    this.details = '';
  }

  getAllJobs() {
    this.data.getAllJobs().subscribe(res => {
      this.recruitersList = res.map((e: any) => {
        const  data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('An error occurred');
    })
  }

  addJob() {
    if (this.jobName == '') {
      alert('Fill all required fields');
      return;
    }
    this.recruitersObj.jobName = this.jobName;
    this.recruitersObj.details = this.details;

    this.data.addJob(this.recruitersObj);
    this.resetForm();
  }

  editJob(recruiters: Recruiters) {
    // if (window.confirm('Do you want to edit ' + recruiters.jobName + ' position from the list?')) {
    //   this.recruitersObj.valueChanges({
    //     jobName: this.recruitersObj.jobName,
    //     details: this.recruitersObj.jobName,
    //   });
    // }
  }

  deleteJob(recruiters: Recruiters) {
    if (window.confirm('Do you want to delete ' +recruiters.jobName + ' position from the list?')) {
      this.data.deleteJob(recruiters);
    }
  }

  logout() {
    this.auth.SignOut();
  }

  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    this.recruitersList = this.recruitersList.filter((e) => e.id.includes(filterValueLower)
      || e.jobName.toLowerCase().includes(filterValueLower)
      || e.details.toLowerCase().includes(filterValueLower));
  }

}

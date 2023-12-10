import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users?: any[] = [];
  constructor(private userService: UserService){

  }

  ngOnInit(): void {
      const users$ = this.userService.getUsersObservable();

      users$.subscribe(data => {
        this.users = data.json();
      })
  }
  // async ngOnInit(): Promise<any> {
  //   try {
  //     this.users = await this.userService.getUsers();
  //     console.log('받아옴', this.users);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  

//   async ngOnInit(): Promise<any> {
//     let data = null;
//     try {
//       data = await this.userService.getUsers(); 

//       console.log('받아옴', data); 
//     } catch (error) {
//       console.log(error);
      
//     }
//     if(data){
//       // console.log('데이터', data);
//       // console.log('결과');
      
//       this.users = data;

      
//     }
//   }
 }

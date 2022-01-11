import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JumbotronAddComponent } from './jumbotron-add/jumbotron-add.component';
import { JumbotronListComponent } from './jumbotron-list/jumbotron-list.component';
import { MainpageJumbotronModule } from './mainpage-jumbotron.module';

const routes: Routes = [

  {
    path: '',
   // component: MainpageJumbotronModule,
    data: {
      title: 'Jumbotron'
    },
    children:[
      {
        path:'',
        component:JumbotronListComponent,
        data: {
          title: '',
        },
      },
      {
        path:'add',
        component:JumbotronAddComponent,
        data: {
          title: 'Add',
        },
      },
   
    ]
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainpageJumbotronRoutingModule { }

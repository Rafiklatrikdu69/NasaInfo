import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ApiService } from '../../modules/module-app/api.service';
import { apod } from '../../modules/module-app/models/apod';
import { date } from '../../modules/module-app/models/date';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { dialog } from '../../modules/module-app/models/dialog';
import { ErrorDateDialogComponent } from '../error-date-dialog/error-date-dialog.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggleBox', [
     
      transition('open => closed', [
        
        style({transform: 'rotateY(-180deg)'}),
        animate('.5s')
      
      ]),
      transition('closed => open', [
        style({transform: 'rotateY(180deg)'}),
        animate('0.5s')
      ]),
    ])
  ]
})

export class ImageComponent {
  @Input() apod!: apod;
  @Input() tabApi: apod[] = [];
  @Input() date!: date;
  toggleStates: { id: number; isOpen: boolean }[] = [];

  constructor(private api: ApiService, private cd: ChangeDetectorRef,private dialog:MatDialog) {}

  public handler(e: any) {
    var d = new Date(Date.now())
    this.date = new date();
    this.date.setDate(e.target.value);
    if(e.target.value<=d){ 
setTimeout(() => {
    this.api.getInfo(new Date(e.target.value).getFullYear()+"-"+new Date(e.target.value).getMonth()+1+"-"+new Date(e.target.value).getDate()).subscribe(data => {

      let dataParse = JSON.parse(data);
      this.tabApi = []; 
      for (let i = 0; i < dataParse.length; i++) {
        this.apod = new apod(
          dataParse[i].copyright,
          dataParse[i].date,
          dataParse[i].explanation,
          dataParse[i].hdurl,
          dataParse[i].title,
          dataParse[i].url
        );
      
        this.tabApi.push(this.apod);
      }
      this.cd.markForCheck(); 
    });
  },700)
}else{
  let dia = new dialog(this.dialog)
  dia.openDialog(ErrorDateDialogComponent)
}
  }

  isOpen!: any;

  toggle(id: number) {
    this.toggleStates.push({ id: id, isOpen: false });
    this.toggleStates[id].isOpen = !this.toggleStates[id].isOpen;
  
  }
}

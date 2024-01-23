import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ApiService } from '../../modules/module-app/api.service';
import { apod } from '../../modules/module-app/models/apod';
import { date } from '../../modules/module-app/models/date';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  constructor(private api: ApiService, private cd: ChangeDetectorRef) {}

  public handler(e: any) {
    console.log(new Date(e.target.value).getFullYear());
    console.log(new Date(e.target.value).getDate());
    console.log(new Date(e.target.value).getMonth()+1);


    this.date = new date();
    this.date.setDate(e.target.value);
setTimeout(() => {
    this.api.getInfo(new Date(e.target.value).getFullYear()+"-"+new Date(e.target.value).getMonth()+1+"-"+new Date(e.target.value).getDate()).subscribe(data => {
      console.log(data);
      //if(Date.parse(e.target.value)<=d){ 
      let dataParse = JSON.parse(data);
      this.tabApi = []; // Réinitialiser le tableau
      for (let i = 0; i < dataParse.length; i++) {
        this.apod = new apod(
          dataParse[i].copyright,
          dataParse[i].date,
          dataParse[i].explanation,
          dataParse[i].hdurl,
          dataParse[i].title,
          dataParse[i].url
        );
        console.log(this.apod.getTitre());
        this.tabApi.push(this.apod);
      }
      this.cd.markForCheck(); 
    });
  },2000)
  }

  isOpen!: any;

  toggle(id: number) {
    this.toggleStates.push({ id: id, isOpen: false });
    this.toggleStates[id].isOpen = !this.toggleStates[id].isOpen;
    console.log('tourne : ' + this.toggleStates[id].isOpen);
  }
}

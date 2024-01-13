import { Component, Input } from '@angular/core';
import { ApiService } from '../../modules/module-app/api.service';
import { apod } from '../../modules/module-app/models/apod';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
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
  @Input() apod !: apod
  @Input() tabApi : apod[] = [];
  constructor(private api :ApiService){}
  ngOnInit(): void {
    this.api.getInfo("2024-01-12").subscribe(data=>{
      console.log(data)
      let dataParse = JSON.parse(data)
      for(let i = 0;i<dataParse.length;i++){
        this.apod = new apod(dataParse[i].copyright,dataParse[i].date,dataParse[i].explanation,dataParse[i].hdurl,dataParse[i].title,dataParse[i].url)
        console.log(this.apod.getTitre());
        this.tabApi.push(this.apod)
      }
       
    })    
  }


  isOpen!:any ;
 
    toggle() {
      this.isOpen = !this.isOpen;
    }
}

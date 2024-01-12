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
  constructor(private api :ApiService){}
  ngOnInit(): void {
    this.api.getInfo().subscribe(data=>{
      let dataParse = JSON.parse(data)
      this.apod = new apod(dataParse.copyright,dataParse.date,dataParse.explanation,dataParse.hdurl,dataParse.title,dataParse.url)
      console.log(this.apod.getTitre());
    })

    
    
  }


  isOpen!:any ;
 
    toggle() {
      this.isOpen = !this.isOpen;
    }
}

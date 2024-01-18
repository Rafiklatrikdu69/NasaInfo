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
  toggleStates: { id: number; isOpen: boolean }[] = [];

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
    let toggle = document.querySelectorAll('.toggle');
  
    for(let i = 1;i<toggle.length;i++){
      toggle[i].setAttribute("id",i+"")
     
      
    } 
    for(let i = 0;i<toggle.length;i++){
      toggle[i].addEventListener('click' , ()=>{
        //console.log(toggle[i].id)
        this.toggleStates.push({id:i,isOpen:false})
        console.log(this.toggleStates[i].id);
        this.toggle(i);
      })

    } 
  
  }


  isOpen!:any ;
 
    toggle(id:number) {
   
      this.toggleStates[id].isOpen = !this.toggleStates[id].isOpen;
      console.log("tourne : "+this.toggleStates[id].isOpen)
 
    }
}

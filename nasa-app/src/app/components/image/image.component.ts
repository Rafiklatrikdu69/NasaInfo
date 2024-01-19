import { Component, Input } from '@angular/core';
import { ApiService } from '../../modules/module-app/api.service';
import { apod } from '../../modules/module-app/models/apod';
import { animate, style, transition, trigger } from '@angular/animations';
import { date } from '../../modules/module-app/models/date';
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
  @Input() date !: date;
  toggleStates: { id: number; isOpen: boolean }[] = [];

  constructor(private api :ApiService){}
 
  ngOnInit(): void {
  
   
  
  }
  public handler(e:any){
console.log(e.target.value)
this.date = new date();
      this.date.setDate(e.target.value);
      this.api.getInfo(this.date.getDate()).subscribe(data=>{
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
    
      
  }

  isOpen!:any ;
 
    toggle(id:number) {
      this.toggleStates.push({id:id,isOpen:false})
      this.toggleStates[id].isOpen = !this.toggleStates[id].isOpen;
      console.log("tourne : "+this.toggleStates[id].isOpen)
 
    }
}

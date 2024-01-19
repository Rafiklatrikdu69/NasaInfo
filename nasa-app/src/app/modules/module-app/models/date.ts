export class date{
    date!:string
    constructor(){
        this.date = new Date().toString();
    }
    public getDate():string{
        return this.date;
    }
    public setDate(date:string){
    this.date = date;
    }
}
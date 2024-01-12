export class apod {

    private copyright ?:string;
    private date?:object;
    private description?:string;
    private hurl ?:string;
    private titre ?:string;
    private url ?:string
    constructor( copyright :string,date?:object,description?:string,hurl ?:string,titre ?:string,url ?:string){
            this.copyright = copyright;
            this.date = date;
            this.description = description;
            this.hurl = hurl;
            this.titre = titre;
            this.url = url;
    }
    public getCopyright(){
        return this.copyright;
    }
    public getDate(){
        return this.date;
    }
    public getDescription(){
        return this.description;
    }
    public getHurl(){
        return this.hurl;
    }
    public getTitre(){
        return this.titre;
    }
    public getUrl(){
        return this.url;
    }
}
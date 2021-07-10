export class AddArticleRequest {
    public title:string="";
    public country:string="";
    public state:string="";
    public province:string="";
    public address:string="";
    public description:string="";
    public type:string="";
    public price!: number;
    public priceType:string="";
    public numberOfRoomMates=1;
}

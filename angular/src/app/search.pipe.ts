import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(gameList:any[],searchTerm:string): any[] {
    if(!gameList || !searchTerm){
        return gameList;
    }
    else{
      console.log("in search",searchTerm,"gamelist=",gameList)
      return gameList.filter(gameobj=>gameobj.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  originalPeople: any[] = [];
  people: any[] = [];
  peopleSaved:string[]=[];
  savedNames: string[]=[];
  searchValue: string = '';
  loading=false

constructor(
  private swapiService: SwapiService,
  private router: Router
){}

ngOnInit() {
  this.loading = true;
  const savedNamesString = localStorage.getItem('peopleSaved');
  this.savedNames = savedNamesString ? JSON.parse(savedNamesString) : null;
  this.swapiService.getPeople().subscribe({
    next: (data) => {
      this.originalPeople = data.results;
      this.people = [...this.originalPeople];
      this.fetchHomeworldNames();
      this.loading = false;
    },
    error: (error) => {
      console.log('An error while fetching people:', error);
      this.loading = false;
    }
  });

}

fetchHomeworldNames() {
  this.people.forEach((person) => {

    this.swapiService.getPlanet(person.homeworld).subscribe({
      next: (planet) => {
        person.homeworld = planet.name;
      },
      error: (error) => {
        console.log('An error occurred while fetching homeworld:', error);
      }
    });
  });
}

handleButtonClicked(savedName:string){

  if(this.savedNames){
    this.peopleSaved=this.savedNames;

  };
  if (this.peopleSaved.includes(savedName)) {
  return
}else{
  this.peopleSaved.push(savedName)
  localStorage.setItem('peopleSaved', JSON.stringify(this.peopleSaved));
}
}
searchByName(searchValue: string) {
  if (searchValue.trim() !== '') {
    this.people = this.originalPeople.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else {
    this.people = [...this.originalPeople];
  }
}

redirectToHome() {
  this.router.navigate(['/home']);
}

}

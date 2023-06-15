import { Component,OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  people: any[] = [];
  peopleSaved:string[]=[];
  savedNames: string[]=[];

constructor(private swapiService: SwapiService,private router: Router){

}
ngOnInit() {
  const savedNamesString = localStorage.getItem('peopleSaved');
  this.savedNames = savedNamesString ? JSON.parse(savedNamesString) : null;
this.getPeople();
}

getPeople(){
  this.swapiService.getPeople().subscribe({
    next: (data) => {
      this.people = data.results.filter((person: { name: string; }) => this.savedNames.includes(person.name));
      this.fetchHomeworldNames();
    },
    error: (error) => {
      console.log('An error while fetching people:', error);
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
deleteButton(savedName: string) {
  if (this.savedNames) {
    this.peopleSaved = this.savedNames;
  }

  if (this.peopleSaved.includes(savedName)) {

    // Remove the specific name from the array
    this.peopleSaved = this.peopleSaved.filter(name => name !== savedName);

    // Update the local storage with the new array
    localStorage.setItem('peopleSaved', JSON.stringify(this.peopleSaved));
        // Trigger change detection to update the DOM
        this.getPeople();
        window.location.reload();
  }
}

redirectToHome() {
  this.router.navigate(['/home']);
}
}

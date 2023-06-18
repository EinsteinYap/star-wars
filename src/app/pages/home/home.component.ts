import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  originalPeople: any[] = [];
  people: any[] = [];
  peopleSaved: string[] = [];
  savedNames: string[] = [];
  searchValue: string = '';
  loading = false;
  currentPage = 1;
  itemsPerPage = 4;

  constructor(
    private swapiService: SwapiService,
    private router: Router
  ) {}

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
        console.log('An error occurred while fetching people:', error);
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

  handleButtonClicked(savedName: string) {
    if (this.savedNames) {
      this.peopleSaved = this.savedNames;
    }
    if (this.peopleSaved.includes(savedName)) {
      return;
    } else {
      this.peopleSaved.push(savedName);
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
  getPagesArray() {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pagedPeople() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.people.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.people.length / this.itemsPerPage);
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
}

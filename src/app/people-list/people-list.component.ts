import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiResponse, People } from '../people';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FetchingPeopleService } from '../services/fetching-people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit{

  isDark!: boolean;
  data!: ApiResponse;
  error!: string;
  people: People[] = [];
  allPeople: any[] = [];
  filteredPeople: People[] = [];
  currentPage = 1; 
  firstPage = 0;
  pageSize = 20;
  totalPages!: number;  
  isLoading: boolean = false;
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fetchingService : FetchingPeopleService) { }

  ngOnInit() {
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.loadAllPeople();
    console.log(this.filteredPeople);
  }

  toggleTheme() {
  this.isDark = !this.isDark;
  localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  loadAllPeople() {
    this.isLoading = true;
    this.fetchingService.getAllPeople(this.currentPage).subscribe((data: any) => {
      this.allPeople = this.allPeople.concat(data.results);
      this.filteredPeople = this.allPeople;
      this.totalPages = Math.ceil(data.count / this.pageSize); // Change to data.count
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadAllPeople();
      }
      this.isLoading = false; 
    }, error => {
      console.error("Error loading people:", error);
      this.error = "Failed to load people. Please try again later.";
      this.isLoading = false; 
    });
  }
  
  
  getPagedData(): any[] {
    const startIndex = (this.firstPage) * (this.pageSize);
    const endIndex = startIndex + this.pageSize;
    return this.filteredPeople.slice(startIndex, endIndex);
  }
  
  onPageChange(event: PageEvent): void {
    this.firstPage = event.pageIndex;
  }
  searchPeople(searchTerm: string): void {
    if (!searchTerm){
      this.filteredPeople = this.allPeople;
      return;
    }
    this.filteredPeople = this.allPeople.filter(person => {
      return person.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}

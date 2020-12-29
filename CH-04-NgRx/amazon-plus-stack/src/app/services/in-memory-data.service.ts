import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      {
        name: "ASP.NET Web API Core",
        price: 9.99,
        image: "/assets/images/image001.jpg",
        description: "The bestest fruit known to man. Sweet yet sour but beautiful"
      },
      {
        name: "Angular 11 Express, Node",
        price: 9.99,
        image: "/assets/images/image002.jpg",
        description: "Succulent and watery, you'll never run out of water"
      },
      {
        name: "ASP.NET Web API Core 5",
        price: 9.99,
        image: "/assets/images/image003.jpg",
        description: "Sour but important for revitalization"
      },
      {
        name: "Angular 11",
        price: 9.99,
        image: "/assets/images/image004.jpg",
        description: "An every day fruit, can be served with every dish"
      },
      {
        name: "Pro Angular 7x and REST APIs",
        price: 9.99,
        image: "/assets/images/image011.jpg",
        description: "Sliced and served with your salad. Served as snacks midway through the day"
      },
      {
        name: "React 16",
        price: 9.99,
        image: "/assets/images/image012.jpg",
        description: "just a book"
      }
    ];
    return {products};
  }
}

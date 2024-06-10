import { Tour } from "../tour/tour";

export class Destination {
    id: number;
    name: string;
    image: string;
    description: string;
    tours: Tour[];

    constructor(id: number, name: string, image: string, description: string, tours: Tour[]) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.tours = tours
    }
}

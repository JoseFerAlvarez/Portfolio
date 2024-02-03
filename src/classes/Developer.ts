import type IDeveloper from "../interfaces/IDeveloper";
import type IProyect from "../interfaces/IProject";

export default class Developer implements IDeveloper {
    email: string;
    full_name: string;
    avatar_url: string;
    location: string;
    website: string;
    description: string;
    username: string;
    proyects: IProyect[];

    constructor({
        email,
        full_name,
        avatar_url,
        location,
        website,
        description,
        username,
        proyects
    }: IDeveloper) {
        this.email = email;
        this.full_name = full_name;
        this.avatar_url = avatar_url;
        this.location = location;
        this.website = website;
        this.description = description;
        this.username = username;
        this.proyects = proyects;
    }
}
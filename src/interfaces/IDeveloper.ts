import type IProject from "./IProject";

export default interface Developer {
    email: string;
    full_name: string;
    avatar_url: string;
    location: string;
    website: string;
    description: string;
    username: string;
    proyects?: IProject[];
}
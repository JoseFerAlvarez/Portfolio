import type IApiDeveloper from "../interfaces/IApiDeveloper";
import type IDeveloper from "../interfaces/IDeveloper";
import Project from "./Project";

export default class Developer implements IDeveloper {
    email: string;
    full_name: string;
    avatar_url: string;
    location: string;
    website: string;
    description: string;
    username: string;
    projects?: Project[];

    constructor() {
        this.email = '';
        this.full_name = '';
        this.avatar_url = '';
        this.location = '';
        this.website = '';
        this.description = '';
        this.username = '';
        this.projects = [];
    }

    set setDeveloper({
        email,
        full_name,
        avatar_url,
        location,
        website,
        description,
        username,
    }: IDeveloper) {
        this.email = email;
        this.full_name = full_name;
        this.avatar_url = avatar_url;
        this.location = location;
        this.website = website;
        this.description = description;
        this.username = username;
    }

    set setDeveloperProjects(projects: Project[]) {
        this.projects = projects;
    }

    async fetchDeveloper(): Promise<IDeveloper | undefined> {
        try {
            const res = await fetch(`${import.meta.env.API_URL}/user`, {
                method: "GET",
                headers: {
                    Authorization: import.meta.env.ACCESS_TOKEN,
                },
            });
            const data: IApiDeveloper = await res.json();

            return {
                email: data.email,
                full_name: data.full_name,
                avatar_url: data.avatar_url,
                location: data.location,
                website: data.website,
                description: data.description,
                username: data.username,
            };
        } catch (error) {
            console.log(error);
            return;
        }
    };

    async fetchDeveloperProjects() {
        try {
            const res = await fetch(`${import.meta.env.API_URL}/user/repos`, {
                method: 'GET',
                headers: {
                    Authorization: import.meta.env.ACCESS_TOKEN,
                },
            });
            const data = await res.json();

            return data.map((project: any) => {
                return new Project({
                    name: project.name,
                    website: project.website,
                    description: project.description,
                    image_url: project.image_url,
                });
            });

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
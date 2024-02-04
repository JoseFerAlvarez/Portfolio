export interface IApiContent {
    name: string
    path: string
    sha: string
    type: string
    size: number
    encoding: any
    content: any
    target: any
    url: string
    html_url: string
    git_url: string
    download_url: string
    submodule_git_url: any
    _links: Links
}

export interface Links {
    self: string
    git: string
    html: string
}
import type IApiDeveloper from "./IApiDeveloper"

export default interface IApiProject {
    id: number
    owner: IApiDeveloper
    name: string
    full_name: string
    description: string
    empty: boolean
    private: boolean
    fork: boolean
    template: boolean
    parent: any
    mirror: boolean
    size: number
    html_url: string
    ssh_url: string
    clone_url: string
    original_url: string
    website: string
    stars_count: number
    forks_count: number
    watchers_count: number
    open_issues_count: number
    open_pr_counter: number
    release_counter: number
    default_branch: string
    archived: boolean
    created_at: string
    updated_at: string
    permissions: Permissions
    has_issues: boolean
    internal_tracker: InternalTracker
    has_wiki: boolean
    has_pull_requests: boolean
    has_projects: boolean
    ignore_whitespace_conflicts: boolean
    allow_merge_commits: boolean
    allow_rebase: boolean
    allow_rebase_explicit: boolean
    allow_squash_merge: boolean
    default_merge_style: string
    avatar_url: string
    internal: boolean
    mirror_interval: string
}

interface Permissions {
    admin: boolean
    push: boolean
    pull: boolean
}

interface InternalTracker {
    enable_time_tracker: boolean
    allow_only_contributors_to_track_time: boolean
    enable_issue_dependencies: boolean
}
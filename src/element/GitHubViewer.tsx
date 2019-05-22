import { ElementProvider } from '../layout/ElementProvider';
import { IGithubReadme } from '../Types';
import { IGithubRepo } from '../Types';
import { IPropsLayoutComponent } from '../layout/LayoutComponent';
import { IPropsLayoutElement } from '../layout/LayoutElement';
import { IStateLayoutElement } from '../layout/LayoutElement';
import { LayoutElement } from '../layout/LayoutElement';
import { LayoutManager } from '../layout/LayoutManager';

interface IRepositoryReadme
{
    readmeError?: Error;
    readme?: string;
}

interface IRepositoryInfo
{
    name: string;
    url: string;

    description?: string;
}

type IRepository = IRepositoryInfo & IRepositoryReadme;

export interface IPropsGitHubViewerComponent extends IPropsLayoutComponent
{
    manager: LayoutManager;

    repositories?: IRepository[];
    error?: Error;
}

interface IPropsGitHubViewerElement extends IPropsLayoutElement
{
    user: string;
}

interface IStateGitHubViewerElement extends IStateLayoutElement
{
    error?: Error;
    repositories?: IRepository[];
}

@ElementProvider()
export class GitHubViewer extends LayoutElement<IPropsGitHubViewerElement, IStateGitHubViewerElement>
{
    private githubApi: string = 'https://api.github.com';

    public constructor(props: IPropsGitHubViewerElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(GitHubViewer.name)
        };
    }

    private async fetchRepositories(): Promise<void>
    {
        try
        {
            const response: Response  = await fetch(`${this.githubApi}/users/${this.props.user}/repos`);
            const data: IGithubRepo[] = await response.json();

            /*
             * I don't really like how I have to use index iteration here.
             * But as far as I'm aware, this is the only thing to have async behavior inside a loop.
             * It's not bad, it just doesn't look JavaScripty enough.
             */
            const repositories: IRepository[] = [];

            for (let i = 0; i < data.length; ++i)
            {
                const currentRepo: IGithubRepo = data[i];

                const currentRepoInfo: IRepository = {
                    name: currentRepo.name,
                    url: currentRepo.url,

                    description: currentRepo.description
                };

                const currentRepoReadme: IRepositoryReadme = await this.fetchReadme(currentRepoInfo.name);
                Object.assign(currentRepoInfo, currentRepoReadme);

                repositories.push(currentRepoInfo);
            }

            this.setState({
                repositories
            });
        }
        catch (error)
        {
            this.setState({
                error
            });
        }

    }

    private async fetchReadme(name: string): Promise<IRepositoryReadme>
    {
        const readmeInfo: IRepositoryReadme = {};

        try
        {
            const response: Response = await fetch(`${this.githubApi}/repos/${this.props.user}/${name}/readme`);
            const data: IGithubReadme = await response.json();

            readmeInfo.readme = atob(data.content);
        }
        catch (error)
        {
            readmeInfo.readmeError = error;
        }
        finally
        {
            return readmeInfo;
        }
    }

    public componentDidMount()
    {
        super.componentDidMount();

        if (!this.state.repositories || this.state.error)
        {
            this.fetchRepositories();
        }
    }

    public getComponentProps(): IPropsGitHubViewerComponent
    {
        return {
            manager: this.props.manager,

            repositories: this.state.repositories,
            error: this.state.error
        };
    }
}

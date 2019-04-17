import { ElementProvider } from '../layout/ElementProvider';
import { IGithubRepo } from '../Types';
import { IGithubReadme } from '../Types';
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

export interface IPropsGitViewerComponent extends IPropsLayoutComponent
{
    manager: LayoutManager;

    repositories?: IRepository[];
    error?: Error;
}

interface IPropsGitViewerElement extends IPropsLayoutElement
{
    user: string;
}

interface IStateGitViewerElement extends IStateLayoutElement
{
    error?: Error;
    repositories?: IRepository[];
}

@ElementProvider()
export class GitViewer extends LayoutElement<IPropsGitViewerElement, IStateGitViewerElement>
{
    private githubApi: string = 'https://api.github.com';

    public constructor(props: IPropsGitViewerElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(GitViewer.name)
        };
    }

    private async fetchRepositories(): Promise<void>
    {
        try
        {
            const response: Response  = await fetch(`${this.githubApi}/users/${this.props.user}/repos`);
            const data: any = await response.json();

            /*
             * I don't really like how I have to use index iteration here.
             * But as far as I'm aware, this is the only thing to have async behavior inside a loop.
             * It's not bad, it just doesn't look JavaScripty enough.
             */
            const repositories: IRepository[] = data.map((fetchInfo: IGithubRepo) => {
                const currentRepoInfo: IRepository = {
                    name: fetchInfo.name,
                    url: fetchInfo.url,

                    description: fetchInfo.description
                };
                this.fetchReadme(currentRepoInfo.name);

                return currentRepoInfo;
            });

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

    private async fetchReadme(name: string): Promise<void>
    {
        const readmeInfo: IRepositoryReadme = {};

        try
        {
            const response: Response = await fetch(`${this.githubApi}/repos/${this.props.user}/${name}/readme`);
            const data: any = await response.json();

            const fetchReadme: IGithubReadme = data as IGithubReadme;
            readmeInfo.readme = atob(fetchReadme.content);
        }
        catch (error)
        {
            readmeInfo.readmeError = error;
        }
        finally
        {
            const { repositories } = this.state;
            if (repositories)
            {
                const index: number = repositories.findIndex(repository => repository.name === name);
                Object.assign(repositories[index], readmeInfo);

                this.setState({
                    repositories
                });
            }
        }
    }

    public componentDidMount()
    {
        this.fetchRepositories();
    }

    public getComponentProps(): IPropsGitViewerComponent
    {
        return {
            manager: this.props.manager,

            repositories: this.state.repositories,
            error: this.state.error
        };
    }
}

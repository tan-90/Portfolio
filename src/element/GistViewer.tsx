import { ElementProvider } from '../layout/ElementProvider';
import { IPropsLayoutComponent } from '../layout/LayoutComponent';
import { IPropsLayoutElement } from '../layout/LayoutElement';
import { IStateLayoutElement } from '../layout/LayoutElement';
import { LayoutElement } from '../layout/LayoutElement';
import { LayoutManager } from '../layout/LayoutManager';
import { IGithubGist } from '../Types';
import { IGithubGistFile } from '../Types';

interface IGistReadme
{
    readmeError?: Error;
    readme?: string;
}

interface IGistInfo
{
    name: string;
    url: string;
    rawUrl: string;

    description?: string;
}

type IGist = IGistInfo & IGistReadme;

export interface IPropsGistViewerComponent extends IPropsLayoutComponent
{
    manager: LayoutManager;

    gists?: IGist[];
    error?: Error;
}

interface IPropsGistViewerElement extends IPropsLayoutElement
{
    user: string;

    filePrefix: string;
}

interface IStateGistViewerElement extends IStateLayoutElement
{
    error?: Error;
    gists?: IGist[];
}

@ElementProvider()
export class GistViewer extends LayoutElement<IPropsGistViewerElement, IStateGistViewerElement>
{
    private githubApi: string = 'https://api.github.com';

    public constructor(props: IPropsGistViewerElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(GistViewer.name)
        };
    }

    private async fetchGists(): Promise<void>
    {
        try
        {
            const response: Response  = await fetch(`${this.githubApi}/users/${this.props.user}/gists`);
            const data: any = await response.json();

            const gistsData: IGithubGist[] = data.filter((fetchInfo: IGithubGist) => {

                /*
                 * Why is this an object instead of an array GitHub???
                 */
                const gistFileNames: string[] = Object.keys(fetchInfo.files);
                if (gistFileNames.length === 0)
                {
                    console.warn(`[GistViewer] One of the gists had no files and will be ignored: ${fetchInfo.url}`);
                    return false;
                }

                if (gistFileNames[0].startsWith(this.props.filePrefix))
                {
                    if (gistFileNames.length > 1)
                    {
                        console.warn(`[GistViewer] One of the gists had more than one file: ${fetchInfo.url}\nThe viewer will display the contents of the first file, but you should have only one file per gist.`);
                    }
                    return true;
                }

                return false;
            });

            const gists: IGist[] = [];

            for (let i = 0; i < gistsData.length; ++i)
            {
                /*
                 * I can't loop by type and this looks better than a cast.
                 */
                const currentGist: IGithubGist = gistsData[i];

                const gistFileNames: string[] = Object.keys(currentGist.files);
                const gistFile: IGithubGistFile = currentGist.files[gistFileNames[0]];

                const currentGistInfo: IGist = {
                    name: gistFile.filename.replace(this.props.filePrefix, '').replace('.md', ''),

                    url: currentGist.url,
                    rawUrl: gistFile.raw_url,

                    description: currentGist.description
                };

                const currentGistReadme: IGistReadme = await this.fetchReadme(currentGistInfo.rawUrl);
                Object.assign(currentGistInfo, currentGistReadme);

                gists.push(currentGistInfo);
            }

            this.setState({
                gists
            });
        }
        catch (error)
        {
            this.setState({
                error
            });
        }

    }

    private async fetchReadme(url: string): Promise<IGistReadme>
    {
        const readmeInfo: IGistReadme = {};

        try
        {
            const response: Response = await fetch(url);
            const data: any = await response.text();

            readmeInfo.readme = data;
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

        if (!this.state.gists || this.state.error)
        {
            this.fetchGists();
        }
    }

    public getComponentProps(): IPropsGistViewerComponent
    {
        return {
            manager: this.props.manager,

            gists: this.state.gists,
            error: this.state.error
        };
    }
}

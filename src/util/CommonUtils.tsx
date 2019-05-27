import { LocalStorageUtils } from './LocalStorageUtils';

export class CommonUtils
{
    public static get firstVisitFinished(): boolean
    {
        return  LocalStorageUtils.getValue(LocalStorageUtils.keyFirstVisitFinished);
    }

    public static finishFirstVisit(): void
    {
        LocalStorageUtils.setValue(LocalStorageUtils.keyFirstVisitFinished, true);
    }
}

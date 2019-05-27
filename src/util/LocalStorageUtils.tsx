export class LocalStorageUtils
{
    public static keyFirstVisitFinished: string = 'firstVisitFinished';

    public static setValue(key: string, value: any)
    {
        localStorage.setItem(key, value);
    }

    public static getValue(key: string): any
    {
        return localStorage.getItem(key);
    }

    public static updateValue(key: string, update: (oldValue: any) => any)
    {
        LocalStorageUtils.setValue(key, update(LocalStorageUtils.getValue(key)));
    }
}

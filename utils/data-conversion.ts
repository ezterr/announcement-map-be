export class DataConversion {
  public static setNullIfEmpty(value: any) {
    if (value === '' || value === undefined) return null;

    return value;
  }
}

export class DataConversion {
  public static setNullIfEmptyString(value: string) {
    if (value === '') return null;

    return value;
  }
}

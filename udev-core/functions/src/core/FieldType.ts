export class FieldType {
    private _options: Object;
    private defaultValues: string[];

    constructor(
        private name: string,
        private nativeType:any,
        _opts: Object = {},
        defaultValues: string[] = []
    ) {
        this._options = Object.assign({}, _opts);
        this.defaultValues = [].concat(['CUSTOM'],defaultValues)
    }

    get defaultOptions() {
        return this._options;
    }

    public static valueOf(fieldType: string) {
        return FieldType[fieldType];
    }

    public static AUTO_NUMBER: FieldType = new FieldType(
        "Auto Number",
        String,
        { format: "#" }
    );

    public static TIMESTAMP: FieldType = new FieldType(
        "Timestamp",
        Date,
        {},
        ['CURRENT_TIMESTAMP']
    );

    public static TEXT: FieldType = new FieldType(
       "Text",
       String
    );

    public static EMAIL: FieldType = new FieldType(
       "Email",
       String
    );

}

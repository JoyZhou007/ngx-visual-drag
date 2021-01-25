declare const list: ({
    component: string;
    label: string;
    propValue: string;
    icon: string;
    animations: any[];
    events: {};
    style: {
        width: number;
        height: number;
        fontSize: number;
        fontWeight: number;
        lineHeight: string;
        letterSpacing: number;
        textAlign: string;
        color: string;
        borderWidth?: undefined;
        borderColor?: undefined;
        borderRadius?: undefined;
        backgroundColor?: undefined;
    };
} | {
    component: string;
    label: string;
    propValue: string;
    icon: string;
    animations: any[];
    events: {};
    style: {
        width: number;
        height: number;
        borderWidth: string;
        borderColor: string;
        borderRadius: string;
        fontSize: number;
        fontWeight: number;
        lineHeight: string;
        letterSpacing: number;
        textAlign: string;
        color: string;
        backgroundColor: string;
    };
} | {
    component: string;
    label: string;
    icon: string;
    propValue: string;
    animations: any[];
    events: {};
    style: {
        width: number;
        height: number;
        borderRadius: string;
        fontSize?: undefined;
        fontWeight?: undefined;
        lineHeight?: undefined;
        letterSpacing?: undefined;
        textAlign?: undefined;
        color?: undefined;
        borderWidth?: undefined;
        borderColor?: undefined;
        backgroundColor?: undefined;
    };
})[];
export default list;

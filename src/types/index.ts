export interface IUseLocation {
    from: {
        pathname: string;
    };
    state: {
        background: string,
        [prop: string]: string
    }
    [key: string]: any
}

export interface IUseParams {
    id: string
}

export type TSetCookieProps = {
    [key: string]: any | {}
}
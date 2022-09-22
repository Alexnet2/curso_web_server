interface ErrorCustom {
    message?: string;
    status?: number;
    internalErr?: string;
}

interface Category {
    id: string;
    name: string;
    parentId: string;
    childreen?: Category[];
}

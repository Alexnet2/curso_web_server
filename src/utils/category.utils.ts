export const withPath = (categories: Category[]) => {
    const categoriesWithPath = categories.map((category) => {
        let path = category.name;
        let parent = getParent(categories, category.parentId);

        while (parent) {
            path = `${parent.name} > ${path}`;
            parent = getParent(categories, parent.parentId);
        }

        return {
            ...category,
            path,
        };
    });

    categoriesWithPath.sort((a, b) => {
        if (a.path < b.path) return 1;
        if (a.path > b.path) return -1;
        return 0;
    });

    return categoriesWithPath;
};

const getParent = (categories: Category[], parentId: string) => {
    const parent = categories.filter((category) => category.id == parentId);
    return parent[0] || null;
};

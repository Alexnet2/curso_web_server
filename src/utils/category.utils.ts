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

export const toTree = (categories: Category[], tree?: Category[]) => {
    if (!tree) tree = categories.filter((category) => !category.parentId);

    tree = tree.map((parentNode) => {
        const isChild = (node: Category) => node.parentId == parentNode.id;
        parentNode.childreen = toTree(categories, categories.filter(isChild));
        return parentNode;
    });
    return tree;
};

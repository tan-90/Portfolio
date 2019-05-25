import { ReactNode } from 'react';

import { Tag } from './Tags';

export interface IBlogPost
{
    name: string;
    description: string;
    image: string;
    url: string;
    tags: Tag[];

    post?: ReactNode;
}

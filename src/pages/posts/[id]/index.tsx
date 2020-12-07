import { GetStaticPaths, NextPage } from 'next';

type Props = {
    title: string;
    content: string;
};

const Post: NextPage<Props> = ({ title, content }) => {
    return (
        <>
            <h1>{title}</h1>
            <p>{content}</p>
        </>
    );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
        fallback: false,
    };
};

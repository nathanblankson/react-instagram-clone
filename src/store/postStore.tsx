import { create } from 'zustand';

export interface Comment {
    // TODO: NBSon - do we need id for comment?
    postId: string;
    comment: string;
    createdAt: number;
    createdBy: string;
}

export interface BasePost {
    caption: string;
    imageURL: string;
    likes: string[];
    comments: Comment[];
    createdAt: number;
    createdBy: string;
}

export interface Post extends BasePost {
    id: string;
}

export interface PostStoreState {
    posts: Post[];
    createPost: (post: Post) => void;
    deletePost: (id: string) => void;
    setPosts: (posts: Post[]) => void;
    addComment: (postId: string, comment: Comment) => void;
}

const usePostStore = create<PostStoreState>((set) => ({
    posts: [],
    createPost: (post) => {
        set((state) => ({ posts: [post, ...state.posts] }));
    },
    deletePost: (id) => {
        set((state) => ({ posts: state.posts.filter((post: Post) => post.id !== id) }));
    },
    setPosts: (posts) => {
        set({ posts });
    },
    addComment: (postId, comment) => {
        set((state: { posts: Post[]; }) => ({
            posts: state.posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, comment],
                    };
                }

                return post;
            }),
        }));
    },
}));

export default usePostStore;

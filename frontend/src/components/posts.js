import Post from "./post";

export default function Posts({posts}) {
    return (
        <ul>
            {
                posts.map(post => {
                    return (
                        <li key={post.id}>
                            <Post id={post.id} userId={post.user_id} content={post.content} />
                        </li>
                    )
                })
            }
        </ul>
    )
}
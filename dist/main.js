var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchAndRenderPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch posts from the API
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`Failed to fetch posts. Status: ${response.status}`);
            }
            // Parse the response JSON
            const posts = yield response.json();
            // Iterate over the posts and render them as DOM nodes
            const postsContainer = document.getElementById('posts-container');
            let postSequenceNum = 1;
            if (postsContainer) {
                posts.forEach(post => {
                    const postNode = document.createElement('div');
                    postNode.classList.add('post');
                    const titleNode = document.createElement('h2');
                    titleNode.textContent = post.title;
                    const bodyNode = document.createElement('p');
                    bodyNode.textContent = post.body;
                    const bodySequenceNum = document.createElement('p');
                    bodySequenceNum.textContent = postSequenceNum.toString();
                    const htmlBreakLine = document.createElement('hr');
                    postNode.appendChild(bodySequenceNum);
                    postNode.appendChild(titleNode);
                    postNode.appendChild(bodyNode);
                    postNode.appendChild(htmlBreakLine);
                    postsContainer.appendChild(postNode);
                    postSequenceNum++;
                });
            }
            // Return a response with the known shape
            return {
                success: true,
                message: 'Posts fetched and rendered successfully.',
                data: posts,
            };
        }
        catch (error) {
            // Handle errors
            console.error('Error fetching and rendering posts:', error);
            return {
                success: false,
                message: 'Failed to fetch and render posts.',
                error: error.message,
            };
        }
    });
}
// Example usage
fetchAndRenderPosts().then(response => {
    console.log(response);
});

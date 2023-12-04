interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }

  async function fetchAndRenderPosts(): Promise<ApiResponse<Post[]>> {
    try {
      // Fetch posts from the API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch posts. Status: ${response.status}`);
      }
  
      // Parse the response JSON
      const posts: Post[] = await response.json();
  
      // Iterate over the posts and render them as DOM nodes
      const postsContainer = document.getElementById('posts-container');
      
      let postSequenceNum:number = 1;

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

          const htmlBreakLine = document.createElement('hr')
            
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
    } catch (error) {
      // Handle errors
      console.error('Error fetching and rendering posts:', error);
      return {
        success: false,
        message: 'Failed to fetch and render posts.',
        error: error.message,
      };
    }
  }
  
  // Example usage
  fetchAndRenderPosts().then(response => {
    console.log(response);
  });